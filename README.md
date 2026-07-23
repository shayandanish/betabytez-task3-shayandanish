# Betabytez Task 3 — Blog Platform REST API

A simple REST API for a blog platform built with Node.js and Express. It has
user registration/login with JWT authentication, and full CRUD for blog posts.

## Tech Stack

Node.js, Express.js, JWT, bcrypt, dotenv

## Setup

```bash
npm install
cp .env.example .env
# set your own JWT_SECRET in .env
npm start
```

Server runs at `http://localhost:5000`.

## Auth

Protected routes need a token in the header:

Authorization: Bearer <token>

You get this token from register or login.

## Endpoints

| Method | Endpoint             |  Auth Required   | Description          |
| ------ | -------------------- | :--------------: | -------------------- |
| POST   | `/api/auth/register` |        No        | Create a new account |
| POST   | `/api/auth/login`    |        No        | Log in, get a token  |
| GET    | `/api/posts`         |        No        | Get all posts        |
| GET    | `/api/posts/:id`     |        No        | Get one post         |
| GET    | `/api/posts/me/mine` |       Yes        | Get your own posts   |
| POST   | `/api/posts`         |       Yes        | Create a post        |
| PUT    | `/api/posts/:id`     | Yes (owner only) | Update a post        |
| DELETE | `/api/posts/:id`     | Yes (owner only) | Delete a post        |

## Example Request Bodies

Register:

```json
{
  "name": "Shayan",
  "email": "shayandanish2002@gmail.com",
  "password": "shayan"
}
```

Create post:

```json
{ "title": "Hello World", "content": "My first post", "category": "General" }
```

## Notes

- Data is stored in memory (no database) — it resets when the server restarts.
- Passwords are hashed with bcrypt before saving.
