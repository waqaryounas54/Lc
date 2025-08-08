VExpo Platform (MVP)

Prerequisites: Node 18+, npm

Setup

1. Copy env

cp .env.example .env

2. Install deps

npm install

3. Init DB

npx prisma generate
npx prisma migrate dev --name init

4. Run

npm run dev

Open http://localhost:3000

Auth
- Register at / (UI)
- Login to get a JWT

APIs
- GET /healthz
- POST /api/register {email,password,name}
- POST /api/login {email,password}
- GET /api/events
- POST /api/events (JWT of ADMIN/ORGANIZER)
- POST /api/agora/token (JWT) {channelName, role?}

Env
- DATABASE_URL=file:./prisma/dev.db
- JWT_SECRET=...
- AGORA_APP_ID=...
- AGORA_APP_CERTIFICATE=...