# 🏦 Kopeika — финансовая грамотность с элементами геймификации

## 📖 Описание
**Kopeika** — это приложение для обучения финансовой грамотности через микроменеджмент личных и семейных финансов.  
Пользователи объединяются в **гильдии**, управляют своими финансами через **сундуки** (игровая метафора банковских счетов) и получают **ачивки и статусы**.

---

## 🚀 Стек
- **NestJS** (v11)
- **TypeORM**
- **PostgreSQL**
- **Redis**
- **Swagger** (API-документация)
- **JWT аутентификация** (access/refresh токены)

---

## 📂 Основные сущности
- **User** — пользователь системы.
- **Guild** — игровая гильдия для совместного управления бюджетом.
- **GuildUser** — связь пользователя и гильдии.
- **Chest** — «сундук» (аналог банковского счёта), который может быть:
  - дебетовый,
  - кредитная карта,
  - накопительный,
  - кредит,
  - рассрочка,
  - микрозайм.

---

## 🔑 Аутентификация
- Регистрация по email.
- Авторизация через **JWT**:
  - `accessToken` (короткоживущий),
  - `refreshToken` (обновляемый, хранится в БД).
- Управление сессиями:
  - выход с одной сессии,
  - выход со всех сессий кроме текущей.

---

## 📘 API

### Auth
- `POST /auth/register` — регистрация
- `POST /auth/login` — вход
- `POST /auth/refresh` — обновление токенов
- `POST /auth/logout` — выход из текущей сессии
- `POST /auth/logout-all` — выход из всех сессий, кроме текущей

### Guilds
- `POST /guilds` — создать гильдию
- `GET /guilds` — список гильдий текущего пользователя
- `GET /guilds/:id` — информация о гильдии
- `PATCH /guilds/:id` — обновить гильдию
- `DELETE /guilds/:id` — удалить гильдию
- `POST /guilds/:id/users` — добавить пользователя в гильдию
- `DELETE /guilds/:id/users/:userId` — удалить пользователя из гильдии

### Chests
- `POST /guilds/:guildId/chests` — создать сундук в гильдии

---

## 🐳 Запуск через Docker

1. Скопируйте `.env` файлы:
   - `/.env` (корень проекта)
   - `/api/.env` (для сервиса API)

2. Запустите проект:
   ```bash
   docker-compose up --build
   ```

3. Миграции выполняются автоматически при сборке контейнера.

---

## ⚡ Swagger
Документация доступна по адресу:  
👉 [http://localhost:3000/docs/](http://localhost:3000/docs/)

---

## 🛠 Пример `.env`

### `api/.env`
```env
POSTGRES_USER=kopeika
POSTGRES_PASSWORD=kopeika
POSTGRES_DB=kopeika
POSTGRES_HOST=localhost
POSTGRES_PORT=5440

JWT_ACCESS_SECRET=super_access_secret_change_me
JWT_ACCESS_EXPIRES=15m
REFRESH_TTL_DAYS=30
BCRYPT_ROUNDS=12
```

### `/.env`
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
