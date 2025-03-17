# Etapa 1: Construcción
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

# Etapa 2: Ejecución
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN npm install -g pnpm
COPY --from=builder /app/package.json ./package.json
RUN pnpm install --prod
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["pnpm", "start"]
