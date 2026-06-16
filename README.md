# Donna Frontend

Production-grade Next.js frontend for Donna.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

```text
http://localhost:3000
```

## Architecture

```text
src/app/          Route segments and layouts
src/features/     Product feature code
src/components/   Shared UI and layout components
src/lib/          API client, env, utils
src/generated/    Generated API client/types from backend OpenAPI
```

## Environment

```text
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

The dashboard and product pages call the DB-backed task and habit APIs:

- `GET /api/tasks`, `POST /api/tasks`, and `PATCH /api/tasks/{id}`
- `GET /api/habits`, `POST /api/habits`, `PATCH /api/habits/{id}`, and `PATCH /api/habits/{id}/completion`

Calendar and email dashboard panels still use mock data until backend integrations are ready.
