const express = require("express");
const {
  registerUser,
  deleteUser,
  updateUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();

// POST a new user
router.post("/", registerUser);

// DELETE a user
router.delete("/:id", deleteUser);

// UPDATE a user
router.patch("/:id", updateUser);

// login route
router.post("/login", loginUser);

module.exports = router;
