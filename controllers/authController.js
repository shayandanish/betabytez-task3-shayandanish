const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
}

// POST /api/auth/register
async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "name, email, and password are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  const existing = User.findByEmail(email);
  if (existing) {
    return res
      .status(400)
      .json({ message: "A user with that email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = User.createUser({ name, email, hashedPassword });
  const token = generateToken(user);

  return res.status(201).json({
    message: "User registered successfully",
    user: User.toPublicJSON(user),
    token,
  });
}

// POST /api/auth/login
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = User.findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user);

  return res.status(200).json({
    message: "Login successful",
    user: User.toPublicJSON(user),
    token,
  });
}

module.exports = { register, login };
