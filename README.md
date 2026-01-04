# Sports Tapri Backend

A scalable backend API for sports applications providing **matches, sports, leagues, players**, and **user favourites**, built with **Node.js, Express, Prisma, and PostgreSQL (Neon)**.

Designed for **cursor-based pagination**, **serverless deployments**, and **high performance**.

---

## Frontend Repo

**Frontend Repository:** https://github.com/PhazeAnkit/sport-tapri-frontend

---

## Features

- Cursor-based infinite scrolling (no OFFSET)
- One-hit DB operations (atomic & safe)
- Clean separation of Routes / Controllers / Services
- Prisma ORM with PostgreSQL
- Ready for Vercel / serverless environments
- JWT-based authentication support
- Favourites system (matches)

---

## Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript

### Database & ORM

- PostgreSQL
- Prisma ORM
- Neon Serverless Postgres

### Auth & Utilities

- JWT (authentication)
- bcrypt / bcryptjs (password hashing)
- dotenv (environment variables)

### Deployment

- Vercel (Serverless Functions)
- Neon (Database)

---

## Project Structure

```
src/
 ├── controllers/
 ├── services/
 ├── routes/
 ├── db/
 │    └── prisma.ts
 ├── middlewares/
 ├── generated/
 │    └── prisma/
 └── index.ts
```

---

## Setup Instructions

### Clone the repository

```bash
git clone https://github.com/your-username/sports-api.git
cd sports-api
```

---

### Install dependencies

```bash
npm install
```

---

### Environment variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST/db?sslmode=require
JWT_SECRET=your_jwt_secret
PORT=3000
NODE_ENV= //{development||production}
CORS_ORIGINS=   //comma seperated site
```

---

### Prisma setup

```bash
npx prisma generate
npx prisma migrate dev
```

---

### Run the server

```bash
npm run dev
```

Server will start at:

```
http://localhost:3000
```

---

## API Endpoints

### Matches (Primary Feed)

**GET** `/matches?cursor=<ISO_DATETIME>&limit=20`

---

### Sports (Static)

**GET** `/sports`

---

### Leagues (Infinite Scroll)

**GET** `/leagues?cursor=<LEAGUE_ID>&limit=10`

---

### Players (Infinite Scroll)

**GET** `/players?cursor=<PLAYER_ID>&limit=10`

---

### Favourites (Authenticated)

- **GET** `/favourites`
- **POST** `/favourites/:matchId`
- **DELETE** `/favourites/:favouriteId`

---

## Authentication

- JWT-based
- Token sent via `Authorization: Bearer <token>`
- Auth middleware injects `req.user`

---

## Design Decisions

- Cursor pagination for scalability
- Database-enforced constraints
- Service layer for business logic
- One DB hit per mutation

---
