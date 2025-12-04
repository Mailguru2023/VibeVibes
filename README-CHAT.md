# Chat Setup (Telegram + Cloudflare)

Этот документ поможет настроить встроенный сайт‑чат, который связывает посетителя сайта и оператора в Telegram.

## 1) Создайте Telegram‑бота
- Откройте Telegram, найдите @BotFather.
- Команда `/newbot` → задайте имя и юзернейм.
- Сохраните токен (формат `123456789:ABC...`).

## 2) Определите чат для оператора
- Это может быть:
  - Личный чат с ботом (operator отправляет сообщения боту),
  - Группа/канал — добавьте бота как участника и получите `chat_id`.
- Узнать `chat_id` можно через `getUpdates` или добавив простую команду/бот, либо с помощью сторонних инструментов. Временно отправьте сообщение боту и вызовите:
  - `https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getUpdates`
  - Найдите `message.chat.id`.

## 3) Настройте Cloudflare KV
- Создайте KV namespace для чата:
```bash
npx wrangler kv:namespace create CHAT_KV
```
- Откройте `wrangler.toml` и добавьте биндинг:
```toml
kv_namespaces = [
  { binding = "CHAT_KV", id = "<ID_ИЗ_КОМАНДЫ>" }
]
```

## 4) Задайте секреты в Worker
```bash
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_TARGET_CHAT_ID
```

## 5) Настройте Webhook Telegram
- Укажите публичный URL вашего Pages/Workers:
```bash
curl -s "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook" \
  -d "url=https://<ваш-домен>/functions/chat/telegram-webhook"
```

## 6) Деплой
```bash
npx wrangler deploy
```

## 7) Проверка
- Откройте сайт, нажмите кнопку чата, отправьте сообщение.
- В Telegram оператор получит уведомление с `Session: <uuid>`.
- Чтобы ответ пришёл именно этому посетителю, оператор отвечает с префиксом:
```
#session:<uuid> Ваш ответ
```
- Ответ появится в чате на сайте.

## 8) Язык и внешний вид
- Заголовок и кнопки чата меняются вместе с языком сайта (DE/EN) — используются ключи `data-translate`.
- Оформление виджета выполнено в стиле сайта (TailwindCSS), можно менять цвета/тени в `index.html`.

## 9) Трюки и советы
- Если ответы не приходят в браузер, проверьте:
  - В `wrangler.toml` корректный `kv_namespaces` и работает биндинг `CHAT_KV`.
  - Webhook Telegram настроен на актуальный публичный URL.
  - В ответе оператора есть тег `#session:<uuid>`.
- CSP: у вас уже настроен `script-src`/`connect-src`.

## 10) Обслуживание
- Логи ошибок смотрите в Cloudflare Workers dashboard.
- Можно расширить схему до WebSocket + Durable Objects для богатых функций (многопользовательский чат, тайпинг, статусы доставки).
