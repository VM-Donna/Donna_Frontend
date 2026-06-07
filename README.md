# Donna Frontend

Production-grade Next.js frontend for Donna.

## Local setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open:

```text
http://localhost:3000
```

## Architecture

```text
app/              Route segments and layouts
src/features/     Product feature code
src/components/   Shared UI and layout components
src/lib/          API client, env, utils
src/generated/    Generated API client/types from backend OpenAPI
```
