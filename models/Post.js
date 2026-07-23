const { v4: uuidv4 } = require("uuid");
const { posts } = require("../config/db");

function getAll() {
  return posts;
}

function getById(id) {
  return posts.find((p) => p.id === id);
}

function getByAuthor(authorId) {
  return posts.filter((p) => p.author === authorId);
}

function create({ title, content, author, category }) {
  const post = {
    id: uuidv4(),
    title,
    content,
    author,
    category,
    createdAt: new Date().toISOString(),
  };
  posts.push(post);
  return post;
}

function update(id, updates) {
  const post = getById(id);
  if (!post) return null;
  Object.assign(post, updates, { updatedAt: new Date().toISOString() });
  return post;
}

function remove(id) {
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  posts.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, getByAuthor, create, update, remove };
