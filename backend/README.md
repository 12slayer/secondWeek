# MERN Directory — Backend (now PostgreSQL)

Express API for managing user profiles, using **PostgreSQL** as the database
via **Prisma** (a type-safe query builder/ORM).

## Setup

### 1. Install PostgreSQL

- Download from https://www.postgresql.org/download/
- During install, set a password for the default `postgres` user and remember it
- **pgAdmin** is usually bundled with the installer — this is your GUI viewer, equivalent to what MongoDB Compass was for Mongo

### 2. Create a database

Open pgAdmin (or `psql`), connect to your local server, and create a new database:
```sql
CREATE DATABASE myapidb;
```

### 3. Install dependencies

```bash
cd backend
npm install
```

### 4. Configure the connection string

```bash
cp .env.example .env
```
Edit `.env` and set your real password:
```
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/myapidb"
```

### 5. Create the `profiles` table

Prisma reads `prisma/schema.prisma` and creates/updates your actual database tables to match it:
```bash
npx prisma migrate dev --name init
```
This also generates the Prisma Client your code imports.

## Run

```bash
npm start
```
You should see:
```
Connected to PostgreSQL
Server running on http://localhost:3000
```

## Viewing your data

**Option A — pgAdmin:** connect to `localhost`, open `myapidb` → Schemas → public → Tables → `profiles` → right-click → View/Edit Data.

**Option B — Prisma Studio** (a simpler built-in viewer):
```bash
npx prisma studio
```
Opens a browser UI at `http://localhost:5555` showing your `profiles` table directly.

## Endpoints

| Method | Route          | Description       |
|--------|----------------|--------------------|
| GET    | /profiles      | List all profiles  |
| GET    | /profiles/:id  | Get one profile    |
| POST   | /profiles      | Create a profile   |
| PUT    | /profiles/:id  | Update a profile   |
| DELETE | /profiles/:id  | Delete a profile   |

Body shape for POST/PUT — sent as **multipart/form-data** (not JSON), since profiles can include a photo:

| Field      | Type   | Required |
|------------|--------|----------|
| name       | text   | yes      |
| email      | text   | yes      |
| jobTitle   | text   | no       |
| phone      | text   | no       |
| bio        | text   | no       |
| avatar     | file (image) | no |

Uploaded images are saved to `backend/uploads/` and served at `http://localhost:3000/uploads/<filename>`.

## What changed from the MongoDB version

- `models/Profile.js` (Mongoose) → `prisma/schema.prisma` + `lib/prisma.js`
- IDs are now UUID strings from Postgres (field name `id`), not Mongo's `_id`
- `controllers/profilesController.js` now calls `prisma.profile.find/create/update/delete` instead of Mongoose methods
- No more MongoDB Compass — use pgAdmin or `npx prisma studio` instead
