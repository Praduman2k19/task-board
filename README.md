# Task Board – Full Stack Assignment

## Overview

This is a simple Task Board application built using Next.js (App Router), TypeScript, Prisma, and PostgreSQL.

The application allows users to:

- Sign up
- Log in
- Create tasks
- View their own tasks
- Update task status (Todo / In Progress / Done)

The focus of this project is clean backend logic, authentication, database relationships, and understanding of full-stack fundamentals rather than UI polish.

---

# Task Board – Full Stack Assignment

## Live Demo

- https://task-board-nu-eight.vercel.app

## for HR

Simple Task Board is a minimal full-stack app where users sign up, log in, and manage personal tasks (create, view, update status). Built as an assignment to demonstrate backend correctness, authentication, and a small Next.js App Router frontend.

## Short Technical Summary (for tech reviewers)

- Framework: Next.js (App Router)
- Language: TypeScript
- DB: Prisma ORM + PostgreSQL (recommended)
- Auth: Email/password (hashed with bcryptjs) and a simple `userId` cookie for session wiring
- Features: Signup, Login, Create Task, List Tasks, Update Task Status

The code focuses on correct API behavior, access control (each user can only access their tasks), and a simple, testable backend.

## for developer

1. Install dependencies

```
npm install
```

2. Generate Prisma client (required)

```
npx prisma generate
```

3. Run migrations and create local DB (first run)

```
npx prisma migrate dev --name init
```

4. Start development server

```
npm run dev
```

5. Open the app:

```
http://localhost:3000
```

Notes:
- The app expects a generated Prisma client and a running PostgreSQL database for persistent data. Run `npx prisma generate` and `npx prisma migrate dev --name init` before starting the app.

## Environment

- The project is configured to use PostgreSQL. Create a `.env` file at the project root and set `DATABASE_URL` (see `.env.example`).

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

- After setting `DATABASE_URL`, generate the Prisma client and apply migrations as shown in the Quick Start section.

## API Reference (quick)

Base URL (local): `http://localhost:3000`

1) Signup — POST `/api/auth/signup`
  - Body: `{ "email": "you@example.com", "password": "yourpass" }`

2) Login — POST `/api/auth/login`
  - Body: `{ "email": "you@example.com", "password": "yourpass" }`
  - On success: a `userId` cookie is set.

3) Create Task — POST `/api/tasks`
  - Body: `{ "title": "Task title" }`

4) List Tasks — GET `/api/tasks`

5) Update Task — PATCH `/api/tasks/{taskId}`
  - Body: `{ "status": "DONE" }` (allowed: TODO, IN_PROGRESS, DONE)

## Project Structure

```
src/
 ├── app/           # Next.js App Router pages + api
 │    ├── api/      # API routes (auth, tasks)
 │    ├── dashboard/
 │    ├── login/
 │    └── signup/
 ├── lib/           # helper code (prisma client wrapper)
 prisma/             # schema and migrations
```

## Notes for reviewers

- Authentication is cookie-based (simple `userId` cookie). For a more robust system use signed HTTP-only cookies or JWT/session store.
 - The Prisma client must be generated (`npx prisma generate`) before first run to use the database-backed flows.

## Deployment

Live demo (deployed to Vercel): https://task-board-nu-eight.vercel.app


