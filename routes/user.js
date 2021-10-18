const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserInfo,
  deleteUser,
} = require("./utilities/userActions");

// Get all users
router.get("/", getAllUsers);

// Get a user by the user id
router.get("/:id", getUserById);

// Create a new user
router.post("/", createNewUser);

// Update user info using user id
router.put("/:id", updateUserInfo);

// Delete a user by username
// Note: users with posts cannot be deleted need to delete all posts in order to delete the user
router.delete("/:id", deleteUser);

module.exports = router;
