const { v4: uuidv4 } = require("uuid");
const { users } = require("../config/db");

function findByEmail(email) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

function findById(id) {
  return users.find((u) => u.id === id);
}

function createUser({ name, email, hashedPassword }) {
  const user = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

function toPublicJSON(user) {
  const { password, ...publicUser } = user;
  return publicUser;
}

module.exports = { findByEmail, findById, createUser, toPublicJSON };
