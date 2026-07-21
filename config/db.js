// In-memory "database".
// Swap this file out for a real MongoDB connection in Task 4 —
// every other file only talks to `users` and `posts`, so the rest
// of the app doesn't need to change.

const users = []; // { id, name, email, password (hashed) }
const posts = []; // { id, title, content, author (user id), category, createdAt }

module.exports = { users, posts };
