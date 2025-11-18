// server/routes/provider.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getPatients } = require('../controllers/providerController');

// All routes are protected
router.get('/patients', protect, getPatients); // [cite: 14]

module.exports = router;