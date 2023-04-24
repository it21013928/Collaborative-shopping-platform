const express = require("express");

const authMiddleware = require("../middlewares/auth");
const {
  getUser,
  getUsers,
  registerUser,
  deleteUser,
  updateUser,
  loginUser,
  getCustomers,
  getSellers,
  getModerators,
  getUserId,
} = require("../controllers/userController");

const router = express.Router();

// GET user
router.get("/me", authMiddleware, getUser);

// GET user Id
router.get("/id", authMiddleware, getUserId);

// GET users
router.get("/", getUsers);

// GET customers
router.get("/customers", getCustomers);

// GET sellers
router.get("/sellers", getSellers);

// GET moderators
router.get("/moderators", getModerators);

// POST a new user
router.post("/register", registerUser);

// DELETE a user
router.delete("/:token", deleteUser);

// UPDATE a user
router.patch("/me", authMiddleware, updateUser);

// login route
router.post("/login", loginUser);

module.exports = router;
