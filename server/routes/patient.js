// server/routes/patient.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// IMPORT logSleep HERE inside the curly braces
const {
  getDashboard,
  logWater,
  logSteps,
  logSleep 
} = require('../controllers/patientController');

// All routes here are protected
router.get('/dashboard', protect, getDashboard);
router.post('/log/water', protect, logWater);
router.post('/log/steps', protect, logSteps);
router.post('/log/sleep', protect, logSleep); 

module.exports = router;