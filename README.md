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

The MVP task capture page calls `GET /api/tasks` and `POST /api/tasks` on that backend URL.
