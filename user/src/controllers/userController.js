require("dotenv").config();
const secret = process.env.JWT_SECRET;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const { sendEmail } = require('../services/userServices');

// get all users
const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

// get all customers
const getCustomers = async (req, res) => {
  const users = await User.find({
    $or: [{ role: "client" }, { role: "seller-pending" }],
  });
  res.status(200).json(users);
};

// get all sellers
const getSellers = async (req, res) => {
  const users = await User.find({ role: "seller" });
  res.status(200).json(users);
};

// get all moderators
const getModerators = async (req, res) => {
  const users = await User.find({ role: "admin" });
  res.status(200).json(users);
};

// get a single user
const getUser = async (req, res) => {
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "User does not exsist" });
  }

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// get user Id
const getUserId = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "User does not exsist" });
  }

  try {
    const user = await User.findById(userId).select("id");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// register new user
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, address, city, zipCode, password, confirmPassword, role } = req.body;

    // Check name or email or password is empty
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    // Check if email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Email is not valid" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Check password and confirm password are equal or not
    if (!(password === confirmPassword)) {
      return res.status(400).json({
        error: "Password and confirm password mismatch",
      });
    }

    // Check if password is strong enough
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        error:
          "Password not strong enough. Must contains uppercase, lowercase, numbers and more than eight characters",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({ name, email, phone, address, city, zipCode, password: hashedPassword, role });
    await user.save();

    // Create JWT token
    // const token = jwt.sign(
    //   { userId: user._id, role: user.role },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );

    res.status(200).json({ userId: user.id, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    await sendEmail(user.email, 'Account - CSP', 'You have logged in to CSP account successfully');
    res.json({ token, userId: user.id, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const { name, email, phone, address, city, zipCode, role, password } =
      req.body;
    console.log(name, email, phone, address, city, zipCode, role, password);
    const secretKey = process.env.JWT_SECRET;
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user
    user.name = name || user.name;
    user.email = email || user.email;
    user.address = address || user.name;
    user.phone = phone || user.phone;
    user.city = city || user.city;
    user.zipCode = zipCode || user.zipCode;
    user.role = role || user.role;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      return res.json({ message: "Password updated successfully" });
    }

    await user.save();

    return res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.params.token);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user
    await user.remove();

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  loginUser,
  registerUser,
  getCustomers,
  getSellers,
  getModerators,
  getUserId,
};
