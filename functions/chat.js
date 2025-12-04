export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/functions/chat/sse") {
      return handleSSE(request, env);
    }
    if (path === "/functions/chat/send" && request.method === "POST") {
      return handleSend(request, env);
    }
    if (path === "/functions/chat/telegram-webhook" && request.method === "POST") {
      return handleTelegramWebhook(request, env);
    }

    return new Response("Not Found", { status: 404 });
  }
};

function makeCORSHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

async function handleSSE(request, env) {
  const { readable, writable } = new TransformStream();
  const encoder = new TextEncoder();
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const sessionId = crypto.randomUUID();

  // Save session mapping to KV: sessionId -> chatId
  await env.CHAT_KV.put(`session:${sessionId}`, JSON.stringify({ ip, createdAt: Date.now() }), { expirationTtl: 60 * 60 * 24 });

  // Initial open event
  const writer = writable.getWriter();
  await writer.write(encoder.encode(`event: open\ndata: ${JSON.stringify({ sessionId })}\n\n`));

  // Keep-alive pings
  const ping = setInterval(async () => {
    try { await writer.write(encoder.encode(`event: ping\ndata: 1\n\n`)); } catch {}
  }, 25000);

  // Poll KV for operator replies and stream them to client
  const POLL_MS = 2000;
  let lastTs = 0;
  const poll = setInterval(async () => {
    try {
      const prefix = `out:${sessionId}:`;
      const list = await env.CHAT_KV.list({ prefix });
      // Sort by key time if possible
      for (const item of list.keys) {
        const key = item.name;
        const tsStr = key.substring(prefix.length);
        const ts = parseInt(tsStr, 10) || 0;
        if (ts <= lastTs) continue;
        const payload = await env.CHAT_KV.get(key);
        if (payload) {
          await writer.write(encoder.encode(`event: reply\ndata: ${payload}\n\n`));
          await env.CHAT_KV.delete(key);
          lastTs = ts;
        }
      }
    } catch {}
  }, POLL_MS);

  // Close on client abort
  request.signal.addEventListener("abort", async () => {
    clearInterval(ping);
    clearInterval(poll);
    try { await writer.close(); } catch {}
  });

  return new Response(readable, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", ...makeCORSHeaders() } });
}

async function handleSend(request, env) {
  let body;
  try { body = await request.json(); } catch { return new Response(JSON.stringify({ ok: false, error: "invalid_json" }), { status: 400, headers: { "Content-Type": "application/json", ...makeCORSHeaders() } }); }
  const { sessionId, message, name } = body || {};
  if (!sessionId || !message) return new Response(JSON.stringify({ ok: false, error: "missing_fields" }), { status: 400, headers: { "Content-Type": "application/json", ...makeCORSHeaders() } });

  // Post to Telegram Bot API
  const botToken = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_TARGET_CHAT_ID; // your operator chat/channel
  if (!botToken || !chatId) return new Response(JSON.stringify({ ok: false, error: "bot_not_configured" }), { status: 500, headers: { "Content-Type": "application/json", ...makeCORSHeaders() } });

  const text = `\u2709\uFE0F Новый сайт-чат\nSession: ${sessionId}\n${name ? `Name: ${name}\n` : ""}Msg: ${message}`;
  const tgResp = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text })
  });
  const tgJson = await tgResp.json().catch(() => ({}));
  if (!tgResp.ok) return new Response(JSON.stringify({ ok: false, error: "telegram_failed", details: tgJson }), { status: 502, headers: { "Content-Type": "application/json", ...makeCORSHeaders() } });

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json", ...makeCORSHeaders() } });
}

async function handleTelegramWebhook(request, env) {
  // Receive operator replies in Telegram and forward into site chat stream via KV queue.
  let update;
  try { update = await request.json(); } catch { return new Response("bad", { status: 400 }); }

  const message = update?.message || update?.channel_post || update?.edited_message;
  if (!message || !message.text) return new Response("ok", { status: 200 });

  const text = message.text;
  // Expect operator to prefix replies with session tag like #session:<uuid>
  const match = text.match(/#session:([0-9a-f\-]{36})/i);
  if (!match) return new Response("ok", { status: 200 });
  const sessionId = match[1];
  const cleanText = text.replace(/#session:[0-9a-f\-]{36}/i, "").trim();

  // Push message into KV for consumption by SSE clients
  const key = `out:${sessionId}:${Date.now()}`;
  await env.CHAT_KV.put(key, JSON.stringify({ type: "reply", text: cleanText }), { expirationTtl: 60 * 60 });

  return new Response("ok", { status: 200 });
}
