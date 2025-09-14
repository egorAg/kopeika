# 🪙 Kopeika — сервис контроля финансового здоровья

Проект диплома на NestJS + PostgreSQL + Redis.  
Всё разворачивается в Docker через `docker-compose`.

---

## 🚀 Запуск проекта

1. Склонировать репозиторий:

```bash
git clone https://github.com/egorAg/kopeika.git
cd kopeika
```

2. Создать `.env` файлы:

- `.env` (в корне проекта):

```env
# Postgres
POSTGRES_USER=kopeika
POSTGRES_PASSWORD=kopeika
POSTGRES_DB=kopeika
POSTGRES_HOST=localhost

# Redis
REDIS_PORT=6379

# API
API_PORT=3000
```

- `api/.env`:

```env
# Postgres
POSTGRES_USER=kopeika
POSTGRES_PASSWORD=kopeika
POSTGRES_DB=kopeika
POSTGRES_HOST=localhost
POSTGRES_PORT=5440

# JWT
JWT_ACCESS_SECRET=super_access_secret_change_me
JWT_ACCESS_EXPIRES=15m

# Refresh tokens
REFRESH_TTL_DAYS=30

# Password hashing
BCRYPT_ROUNDS=12
```

3. Собрать и запустить проект:

```bash
docker-compose up --build
```

API будет доступно на `http://localhost:3000/api`.

Swagger UI: `http://localhost:3000/api/docs`

---
## 📖 Документация API

После запуска приложение доступно по адресу:

- API: [http://localhost:3000/api](http://localhost:3000/)
- Swagger UI: [http://localhost:3000/docs](http://localhost:3000/docs)

Swagger генерируется автоматически через `@nestjs/swagger`  
и содержит описание всех эндпоинтов, DTO и схем ответов.
---

## 🛠️ Миграции

Миграции запускаются автоматически при старте контейнера.  
Для ручного запуска:

```bash
docker-compose exec api npm run migration:run
docker-compose exec api npm run migration:revert
```

---

## 🏗️ Стек

- **NestJS 11** — backend-фреймворк
- **PostgreSQL** — основная БД
- **TypeORM** — ORM и миграции
- **Redis** — кэш и сессии (резерв)
- **JWT** — авторизация
- **Docker + docker-compose** — инфраструктура

---

## 📂 Структура проекта

```
kopeika/
│── api/               # NestJS приложение
│   ├── src/
│   │   ├── modules/   # модули (auth, user и др.)
│   │   ├── shared/    # общий код (guards, exceptions, utils)
│   │   └── main.ts
│   └── .env
│
│── docker/            # конфиги docker-compose
│── .env               # переменные окружения для docker-compose
│── docker-compose.yml # сборка сервисов
│── README.md          # документация
```

---

## 🔐 Авторизация

- `POST /auth/register` — регистрация
- `POST /auth/login` — вход
- `POST /auth/refresh` — обновление access-токена
- `POST /auth/logout` — выход из одной сессии
- `POST /auth/logout-all-except-current` — выход из всех сессий кроме текущей
- `GET /users/me` — данные текущего пользователя (🔒 требует access-токен)

---

## 📜 Dockerfile (упрощённый)

```dockerfile
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
RUN npm install --omit=dev

# Автозапуск миграций перед стартом
CMD ["sh", "-c", "npm run migration:run && node dist/main.js"]
```

---

## 👨‍💻 Разработчик

Дипломный проект — *Kopeika*.  
Автор: **[Егор Агеев]**
