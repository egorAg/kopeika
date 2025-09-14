# Билдовый слой
FROM node:20 AS builder
WORKDIR /app
COPY ./api/package*.json ./
RUN npm install
COPY ./api .
RUN npm run build

# Продакшн слой
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY ./api/package*.json ./
RUN npm install
CMD ["node", "dist/main.js"]

# Автозапуск миграций перед стартом
CMD ["sh", "-c", "npm run migration:run && node dist/main.js"]