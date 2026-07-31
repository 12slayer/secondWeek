# MERN Directory — Backend

Express + MongoDB (Mongoose) API for managing user profiles.

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set `MONGODB_URI` (local Compass default is fine as-is):
```
MONGODB_URI=mongodb://localhost:27017/myapidb
```

## Run

```bash
npm start
```

You should see:
```
Connected to MongoDB
Server running on http://localhost:3000
```

## Endpoints

| Method | Route          | Description       |
|--------|----------------|--------------------|
| GET    | /profiles      | List all profiles  |
| GET    | /profiles/:id  | Get one profile    |
| POST   | /profiles      | Create a profile   |
| PUT    | /profiles/:id  | Update a profile   |
| DELETE | /profiles/:id  | Delete a profile   |

Body shape for POST/PUT — now sent as **multipart/form-data** (not JSON), since profiles can include a photo:

| Field      | Type   | Required |
|------------|--------|----------|
| name       | text   | yes      |
| email      | text   | yes      |
| jobTitle   | text   | no       |
| phone      | text   | no       |
| bio        | text   | no       |
| avatar     | file (image) | no |

`name` and `email` are required; the rest are optional. Uploaded images are saved to `backend/uploads/` and served at `http://localhost:3000/uploads/<filename>`. That path is stored on the profile as `avatarUrl`.

Max upload size is 5MB; only image files are accepted.
