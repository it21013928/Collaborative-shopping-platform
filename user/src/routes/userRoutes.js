const express = require("express");

const authMiddleware = require("../middlewares/auth");
const {
  getUserEmailPhone,
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
  getPendingSellers,
  approveSeller,
  downgradeToClient,
} = require("../controllers/userController");

const router = express.Router();

// GET user
router.get("/me", authMiddleware, getUser);

// GET user Id
router.get("/id", authMiddleware, getUserId);

// GET user email and phone
router.get("/email-phone", getUserEmailPhone);

// GET users
router.get("/", getUsers);

// GET customers
router.get("/customers", getCustomers);

// GET sellers
router.get("/sellers", getSellers);

// GET pending sellers
router.get("/pending-sellers", getPendingSellers);

// GET moderators
router.get("/moderators", getModerators);

// POST a new user
router.post("/register", registerUser);

// Approve seller request
router.patch("/approve-seller", approveSeller);

// Downgrade seller to customer request
router.patch("/downgrade-user", downgradeToClient);

// DELETE a user
router.delete("/:token", deleteUser);

// UPDATE a user
router.patch("/me", authMiddleware, updateUser);

// login route
router.post("/login", loginUser);

module.exports = router;
