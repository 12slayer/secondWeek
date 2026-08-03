# MERN Directory

A full stack app: PostgreSQL + Express + React + Node. Manage a directory of
user profiles (name, email, job title, phone, bio, photo) with a real relational
database and a working React frontend.

```
mern-app/
├── backend/     # Express API + PostgreSQL (via Prisma)
└── frontend/    # React app (Vite)
```

## Run order (both need to be running at the same time)

**1. Start the backend first**
```bash
cd backend
npm install
cp .env.example .env      # set your real PostgreSQL password
npx prisma migrate dev --name init   # creates the profiles table
npm start
```
Confirm you see `Connected to PostgreSQL` and `Server running on http://localhost:3000`.

**2. Then start the frontend, in a separate terminal**
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173 in your browser.

## What you should see

A "Profiles" directory page with a search bar and an "Add profile" button.
Adding a profile writes to PostgreSQL through the API — you can confirm this
by opening pgAdmin (or running `npx prisma studio` in `backend/`) and seeing
the new row appear in the `profiles` table.

See `backend/README.md` and `frontend/README.md` for details on each side.
