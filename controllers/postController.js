const Post = require("../models/Post");

// GET /api/posts  (public — everyone can see all posts)
function getAllPosts(req, res) {
  return res
    .status(200)
    .json({ count: Post.getAll().length, posts: Post.getAll() });
}

// GET /api/posts/:id  (public — single post)
function getPostById(req, res) {
  const post = Post.getById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  return res.status(200).json({ post });
}

// GET /api/posts/me/mine  (protected — only the logged-in user's posts)
function getMyPosts(req, res) {
  const posts = Post.getByAuthor(req.user.id);
  return res.status(200).json({ count: posts.length, posts });
}

// POST /api/posts  (protected)
function createPost(req, res) {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return res
      .status(400)
      .json({ message: "title, content, and category are required" });
  }

  const post = Post.create({ title, content, category, author: req.user.id });
  return res.status(201).json({ message: "Post created", post });
}

// PUT /api/posts/:id  (protected — owner only)
function updatePost(req, res) {
  const post = Post.getById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.author !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You can only update your own posts" });
  }

  const { title, content, category } = req.body;
  const updated = Post.update(post.id, {
    title: title ?? post.title,
    content: content ?? post.content,
    category: category ?? post.category,
  });

  return res.status(200).json({ message: "Post updated", post: updated });
}

// DELETE /api/posts/:id  (protected — owner only)
function deletePost(req, res) {
  const post = Post.getById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.author !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You can only delete your own posts" });
  }

  Post.remove(post.id);
  return res.status(200).json({ message: "Post deleted" });
}

module.exports = {
  getAllPosts,
  getPostById,
  getMyPosts,
  createPost,
  updatePost,
  deletePost,
};
