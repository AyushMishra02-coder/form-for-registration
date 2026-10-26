# Zevyon esports registration (MERN)

## Requirements
- Node.js 20 or newer
- MongoDB running locally, or a MongoDB Atlas connection string

## Run locally
1. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`.
2. From this folder, run `npm install`, `npm --prefix client install`, and `npm --prefix server install`.
3. Run `npm run dev`. Vite serves the React app at `http://localhost:5173` and proxies `/api` to Express at `http://localhost:5000`.

Set `CLIENT_ORIGIN` in `server/.env` when the client uses a different origin. API submissions are stored in MongoDB; team logos are stored in `server/uploads` and served by the API.

## Registration confirmation email
The API sends a branded confirmation to the participant's registration email after saving their entry. Add SMTP credentials to `server/.env` when you choose the Zevyon sender mailbox: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, and `MAIL_FROM_EMAIL`. The default display name is `Zevyon Esports`; the default sender address is `no-reply@zevyon.gg` and must be authorized by the SMTP provider. Until SMTP credentials are configured, registrations are still saved and the success screen explains that email delivery is not configured.

## API
- `GET /api/health` — API and database status
- `POST /api/registrations` — multipart registration submission (`teamLogo` is optional)
The API validates required fields and roster size, accepts PNG/JPG/SVG logos up to 2 MB, and does not expose a public list or public retrieval endpoint for registrants' personal information.
