// Cloudflare Worker - Lead Form Handler
// This replaces Netlify Functions for Cloudflare Pages

// Simple in-memory rate limiting (per IP)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute per IP

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimitStore.get(ip) || [];
  
  // Filter out old requests
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }
  
  // Add current request
  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);
  
  // Cleanup old entries periodically
  if (rateLimitStore.size > 1000) {
    for (const [key, requests] of rateLimitStore.entries()) {
      if (requests.every(time => now - time > RATE_LIMIT_WINDOW)) {
        rateLimitStore.delete(key);
      }
    }
  }
  
  return true;
}

function validatePhone(phone) {
  // Austrian phone validation (basic)
  const phoneRegex = /^(\+43|0043|0)[1-9]\d{3,12}$/;
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str.trim().substring(0, 500); // Limit length
}

export async function onRequestPost(context) {
  const { request, env } = context;
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method Not Allowed' }),
      { status: 405, headers }
    );
  }

  // Rate limiting
  const clientIP = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown';
  if (!checkRateLimit(clientIP)) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      { status: 429, headers }
    );
  }

  // Parse payload
  let payload;
  try {
    payload = await request.json();
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON' }),
      { status: 400, headers }
    );
  }

  // Honeypot anti-spam
  if (payload.website) {
    console.log('Honeypot triggered from IP:', clientIP);
    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers }
    );
  }

  // Sanitize inputs
  const name = sanitizeInput(payload.name);
  const phone = sanitizeInput(payload.phone);
  const email = sanitizeInput(payload.email);
  const message = sanitizeInput(payload.message);
  const source = sanitizeInput(payload.source) || 'website';

  // Validation
  const errors = [];
  
  if (!name || name.length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }
  
  if (!phone && !email) {
    errors.push('Phone or email is required');
  }
  
  if (phone && !validatePhone(phone)) {
    errors.push('Invalid phone number format');
  }
  
  if (email && !validateEmail(email)) {
    errors.push('Invalid email format');
  }

  if (errors.length > 0) {
    return new Response(
      JSON.stringify({ error: 'Validation failed', details: errors }),
      { status: 400, headers }
    );
  }

  // Prepare clean data
  const leadData = {
    name,
    phone: phone || null,
    email: email || null,
    message: message || '',
    source,
    timestamp: new Date().toISOString(),
    ip: clientIP
  };

  // Track success/failure
  const results = {
    webhook: false,
    email: false
  };

  // 1) Send to Zapier / Google Sheets via webhook (optional)
  if (env.ZAP_WEBHOOK) {
    try {
      const response = await fetch(env.ZAP_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
        signal: AbortSignal.timeout(5000)
      });
      
      if (response.ok) {
        results.webhook = true;
        console.log('Webhook sent successfully');
      } else {
        console.warn('Webhook failed with status:', response.status);
      }
    } catch (err) {
      console.error('Zapier webhook error:', err.message);
    }
  }

  // 2) Send notify email via SendGrid
  if (env.SENDGRID_KEY && env.NOTIFY_EMAIL) {
    try {
      const emailContent = `
Neue Anfrage von der Webseite

Name: ${leadData.name}
Telefon: ${leadData.phone || 'N/A'}
Email: ${leadData.email || 'N/A'}
Nachricht: ${leadData.message}
Quelle: ${leadData.source}
Zeitpunkt: ${leadData.timestamp}
IP: ${leadData.ip}
      `.trim();

      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.SENDGRID_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: env.NOTIFY_EMAIL }] }],
          from: { 
            email: env.FROM_EMAIL || 'no-reply@baumeister.at', 
            name: 'BauMeister Website' 
          },
          subject: `🏗️ Neue Anfrage von ${leadData.name}`,
          content: [{ type: 'text/plain', value: emailContent }]
        }),
        signal: AbortSignal.timeout(5000)
      });

      if (response.ok || response.status === 202) {
        results.email = true;
        console.log('Email sent successfully');
      } else {
        console.warn('SendGrid failed with status:', response.status);
      }
    } catch (err) {
      console.error('SendGrid error:', err.message);
    }
  }

  // Log the lead
  console.log('Lead received:', leadData);

  return new Response(
    JSON.stringify({
      ok: true,
      message: 'Ihre Anfrage wurde erfolgreich gesendet!',
      results
    }),
    { status: 200, headers }
  );
}

// Handle OPTIONS for CORS
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    }
  });
}
