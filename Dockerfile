FROM node:22-slim AS deps
WORKDIR /app
COPY package.json ./
RUN corepack enable && pnpm install

FROM node:22-slim AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable
COPY --from=builder /app ./
EXPOSE 3000
CMD ["pnpm", "start"]
