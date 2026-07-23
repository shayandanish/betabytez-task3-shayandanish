const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const {
  getAllPosts,
  getPostById,
  getMyPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

// NOTE: /me/mine must be declared before /:id or Express will treat
// "me" as an :id param and route it to getPostById instead.
router.get("/me/mine", requireAuth, getMyPosts);

router.get("/", getAllPosts); // public
router.get("/:id", getPostById); // public

router.post("/", requireAuth, createPost);
router.put("/:id", requireAuth, updatePost);
router.delete("/:id", requireAuth, deletePost);

module.exports = router;
