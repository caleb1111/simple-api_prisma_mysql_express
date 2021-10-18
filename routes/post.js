const router = require("express").Router();
const {
  getAllPosts,
  getUserPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  deleteUserPosts,
} = require("./utilities/postActions");

// Get all posts
router.get("/", getAllPosts);

// Get posts of a user by user id
router.get("/user/:id", getUserPosts);

// Get a post by post id
router.get("/:id", getPost);

// Create a post
router.post("/user/:id", createPost);

// Update a post by post id
router.put("/:id", updatePost);

// Delete a post by post id
router.delete("/:id", deletePost);

// Delete posts of a user by user id
router.delete("/user/:id", deleteUserPosts);

module.exports = router;
