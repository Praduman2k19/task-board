# Task Board – Full Stack Assignment

## Overview

This is a simple Task Board application built using Next.js (App Router), TypeScript, Prisma, and SQLite.

The application allows users to:

- Sign up
- Log in
- Create tasks
- View their own tasks
- Update task status (Todo / In Progress / Done)

The focus of this project is clean backend logic, authentication, database relationships, and understanding of full-stack fundamentals rather than UI polish.

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Prisma ORM
- SQLite (Relational Database)
- Tailwind CSS
- bcryptjs (for password hashing)

---

## Authentication Flow

1. User signs up using email and password.
2. Password is hashed using bcrypt before storing in the database.
3. During login:
   - Email is verified.
   - Password is compared with the hashed password.
4. After successful login, a `userId` cookie is stored.
5. All task APIs check this cookie to ensure only authenticated users can access their own tasks.

Each user can only create, view, and update their own tasks.

---

## Database Schema

### User

- id (UUID)
- email (unique)
- password (hashed)
- createdAt

### Task

- id (UUID)
- title
- status (Enum: TODO, IN_PROGRESS, DONE)
- userId (Foreign Key → User.id)
- createdAt

Relationship:

- One User → Many Tasks
- Each Task belongs to one User

---

## How to Run Locally

1. Install dependencies

```bash
npm install
```

2. Run Prisma migration

```bash
npx prisma migrate dev --name init
```

3. Start development server

```bash
npm run dev
```

4. Open in browser:

```
http://localhost:3000
```

---

## API Testing Guide

Base URL:

```
http://localhost:3000
```

Make sure the server is running before testing.

---

### 1. Signup

**POST**

```
http://localhost:3000/api/auth/signup
```

Body:

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

---

### 2. Login

**POST**

```
http://localhost:3000/api/auth/login
```

Body:

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

After successful login, a `userId` cookie is set automatically.

---

### 3. Create Task

**POST**

```
http://localhost:3000/api/tasks
```

Body:

```json
{
  "title": "Complete assignment"
}
```

---

### 4. Get All Tasks

**GET**

```
http://localhost:3000/api/tasks
```

Returns all tasks created by the logged-in user.

---

### 5. Update Task Status

**PATCH**

```
http://localhost:3000/api/tasks/{taskId}
```

Body:

```json
{
  "status": "DONE"
}
```

Allowed values:

- TODO
- IN_PROGRESS
- DONE

---

## Recommended Testing Order

1. Signup  
2. Login  
3. Create Task  
4. Get Tasks  
5. Update Task Status  
6. Get Tasks again to verify changes  

---

## Project Structure

```
src/
 ├── app/
 │    ├── api/
 │    │    ├── auth/
 │    │    └── tasks/
 │    ├── login/
 │    ├── signup/
 │    └── dashboard/
 ├── lib/
 │    └── prisma.ts
 prisma/
   └── schema.prisma
```

---

## Notes

- SQLite is used for simple local setup.
- Passwords are securely hashed.
- Task-user isolation is enforced at the database level.
- The focus is correctness, clarity, and backend understanding.
