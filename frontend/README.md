# MERN Directory — Frontend

React (Vite) app that connects to the backend API to manage user profiles.

## Setup

```bash
cd frontend
npm install
```

## Run

```bash
npm run dev
```

Opens at http://localhost:5173. Make sure the **backend is also running** on http://localhost:3000 — the frontend calls it directly (see `src/api/profiles.js`).

## Structure

```
frontend/
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Main page: list, search, add
    ├── index.css             # Design tokens (colors, fonts)
    ├── api/
    │   └── profiles.js       # All API calls (axios)
    └── components/
        ├── Avatar.jsx        # Colored initials avatar
        ├── ProfileCard.jsx   # One profile in the grid
        └── ProfileForm.jsx   # Create/edit modal form
```

## Features

- List all profiles in a responsive card grid
- Search/filter by name, job title, or email (client-side, instant)
- Add a new profile (modal form)
- Edit an existing profile
- Delete a profile (with confirmation)
