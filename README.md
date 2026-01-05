# Sports Tapri Backend

A scalable backend API for sports applications providing **matches, sports, leagues, players**, and **user favourites**, built with **Node.js, Express, Prisma, and PostgreSQL (Neon)**.

Designed for **cursor-based pagination**, **serverless deployments**, and **high performance**.

---

## Frontend Repo

**Frontend Repository:**  
https://github.com/PhazeAnkit/sport-tapri-frontend

This backend is designed to power the above frontend application.

---

## Features

- Cursor-based infinite scrolling (no OFFSET)
- Advanced match filtering (sport, league, team, date range)
- One-hit DB operations (atomic & safe)
- Clean separation of Routes / Controllers / Services
- Prisma ORM with PostgreSQL
- Ready for Vercel / serverless environments
- JWT-based authentication support
- Favourite matches system (personalized feed)
- Filter-source APIs for dropdowns (sports, leagues, teams)

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
NODE_ENV=development  //{development||production}
CORS_ORIGINS=http://localhost:3000,https://sport-tapri-frontend.vercel.app  //comma seperated links
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

**GET** `/matches`

Supports cursor pagination and advanced filtering.

Query params:
```
cursor=<ISO_DATETIME>
limit=20
sportId=<SPORT_ID>
leagueId=<LEAGUE_ID>
teamId=<TEAM_ID>
fromDate=YYYY-MM-DD
toDate=YYYY-MM-DD
```

---

### Sports
- **GET** `/sports` (static + filter source)

---

### Leagues
- **GET** `/leagues?cursor=<LEAGUE_ID>&limit=10`
- **GET** `/leagues?sportId=<SPORT_ID>` (filter source)

---

### Teams
- **GET** `/teams?sportId=<SPORT_ID>&leagueId=<LEAGUE_ID>`

---

### Players
- **GET** `/players?cursor=<PLAYER_ID>&limit=10`

---

### Favourites (Authenticated)
- **GET** `/favourite`
- **POST** `/favourites/:matchId`
- **DELETE** `/favourites/:favouriteId`

---

## Authentication

- JWT-based authentication
- Token sent via `Authorization: Bearer <token>`
- Auth middleware injects `req.user`

---

## Design Decisions

- Cursor-based pagination for scalability
- Primary feed does filtering + pagination + personalization in one query
- Database-enforced constraints (FK + unique indexes)
- Service layer handles business logic
- Controllers handle HTTP concerns only

---

