// server/routes/auth.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
} = require('../controllers/authController');

// @route   /api/v1/auth
router.post('/register', registerUser); // [cite: 5]
router.post('/login', loginUser); // [cite: 5]

module.exports = router;