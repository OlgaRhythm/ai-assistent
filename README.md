# ai-assistent-frontend

Веб-интерфейс чата для AI-ассистента поддержки маркетплейса. React + TypeScript + Vite.

Работает с backend-репозиторием [`Market_AI_assistent_backend`](https://github.com/An-Vas/Market_AI_assistent_backend)
через единственный основной эндпоинт `POST /support`, а также использует
`GET /orders` для выбора заказа.

## Возможности интерфейса

- Облачка сообщений: свои (справа) и от ассистента (слева).
- Поле ввода сообщения + кнопка Send (Enter тоже отправляет).
- Когда backend просит уточнить заказ (`type: ORDERINFOREQUEST`), прямо под
  этим сообщением ассистента появляется выпадающий список заказов
  пользователя (`GET /orders?userId=`) и кнопка Apply — выбор сразу
  отправляет backend'у `orderId` выбранного заказа.
- Системные уведомления в чате: ошибки сети/сервера и сообщение о передаче
  диалога оператору (`type: OPERATOR`) — как обычное сообщение ассистента,
  поле ввода при этом не блокируется.
- Техническая информация под ответом ассистента (сворачиваемый блок):
  модель классификатора/генератора, intent, confidence, тайминги — то, что
  backend возвращает в поле `technical`.
- Значок ⚙ в шапке открывает панель: кнопка New conversation (новая сессия)
  и ручная установка `User ID` / `Session ID` — backend пока не имеет
  аутентификации, поэтому эти ID выбираются на фронтенде и сохраняются в
  `localStorage`.

## Требования

- Node.js 20+ и npm
- Запущенный backend ([`Market_AI_assistent_backend`](https://github.com/An-Vas/Market_AI_assistent_backend))
  на `http://localhost:5005` (порт настраивается в его `.env`)

## Установка и запуск в разработке

```bash
git clone git@github.com:OlgaRhythm/ai-assistent.git
cd ai-assistent
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`.

Дев-сервер проксирует `/support`, `/orders`, `/hello` на `http://localhost:5005`
(см. `vite.config.ts`), поэтому backend нужно просто запустить отдельно —
настраивать CORS не требуется.

Если backend работает на другом порту/хосте, поменяйте адреса в
`server.proxy` в `vite.config.ts`.

## Переменные окружения

См. `.env.example`. `VITE_API_BASE_URL` можно оставить пустым — тогда запросы
идут по относительным путям (работает и с dev-прокси, и в проде, если
собранный фронтенд раздаётся тем же backend-сервером из его папки `public/`).

## Сборка для продакшена

```bash
npm run build
```

Содержимое `dist/` можно скопировать в `public/` backend-репозитория, чтобы
раздавать фронтенд с того же origin (тогда CORS не требуется совсем).

## Проверки

```bash
npx tsc --noEmit -p tsconfig.app.json   # типы
npm run lint                            # oxlint
npm run build                           # сборка
```
