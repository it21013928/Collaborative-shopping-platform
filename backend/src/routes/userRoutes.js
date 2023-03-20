const express = require("express");

const authMiddleware = require("../middlewares/auth");
const {
  getUser,
  getUsers,
  registerUser,
  deleteUser,
  updateUser,
  loginUser,
} = require("../controllers/userController");


const router = express.Router();

// POST a new user
router.post("/", registerUser);

const router = express.Router();

// GET user
router.get("/me", authMiddleware, getUser);

// GET users
router.get("/", getUsers);

// POST a new user
router.post("/register", registerUser);

// DELETE a user
router.delete("/:id", deleteUser);

// UPDATE a user
router.patch("/:id", updateUser);

// login route
router.post("/login", loginUser);

module.exports = router;
