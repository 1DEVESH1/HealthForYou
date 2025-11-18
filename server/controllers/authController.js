// server/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d', // Token expires in 1 day
  });
};

// @desc    Register a new user (Patient or Provider)
// @route   POST /api/v1/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { email, password, role, name } = req.body; // [cite: 5]

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Create new user
    // Password will be hashed by the 'pre-save' hook in the model
    const user = await User.create({
      email,
      password,
      role,
      profile: { name }, // Add initial profile name
    });

    // 3. Respond with user and token
    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.profile.name,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/v1/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // [cite: 5]

    // 1. Find user by email
    const user = await User.findOne({ email });

    // 2. Check user exists and password matches
    if (user && (await user.matchPassword(password))) {
      // 3. Respond with user and token [cite: 5]
      res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.profile.name,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};