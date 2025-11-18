const DailyLog = require("../models/DailyLog");

// Helper to get today's date as a Date object (UTC start of day)
const getTodayDate = () => new Date(new Date().toISOString().split("T")[0]);

// @desc    Get patient dashboard stats
// @route   GET /api/v1/patient/dashboard
// @access  Private (Patient)
exports.getDashboard = async (req, res) => {
  try {
    const today = getTodayDate();

    // Find log for today, or return defaults
    let log = await DailyLog.findOne({ user: req.user._id, date: today });

    if (!log) {
      log = { steps: 0, water: 0, sleep: 0 };
    }

    // Send 'goals' from the user profile along with stats
    res.json({
      date: today,
      stats: {
        steps: log.steps,
        water: log.water,
        sleep: log.sleep,
      },
      goals: req.user.wellnessGoals,
      reminder: "Upcoming: Annual Blood Test on Dec 12th",
      healthTip: "Drink at least 8 glasses of water today!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Log Water Intake
// @route   POST /api/v1/patient/log/water
// @access  Private (Patient)
exports.logWater = async (req, res) => {
  try {
    const { amount } = req.body; // amount to ADD
    const today = getTodayDate();

    let log = await DailyLog.findOne({ user: req.user._id, date: today });

    if (!log) {
      // Create new log if it doesn't exist
      log = await DailyLog.create({
        user: req.user._id,
        date: today,
        water: amount,
      });
    } else {
      // Update existing log
      log.water += parseInt(amount);
      await log.save();
    }

    res.json(log);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Log Steps
// @route   POST /api/v1/patient/log/steps
// @access  Private (Patient)
exports.logSteps = async (req, res) => {
  try {
    const { count } = req.body; // count to ADD
    const today = getTodayDate();

    let log = await DailyLog.findOne({ user: req.user._id, date: today });

    if (!log) {
      log = await DailyLog.create({
        user: req.user._id,
        date: today,
        steps: count,
      });
    } else {
      log.steps += parseInt(count);
      await log.save();
    }

    res.json(log);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Log Sleep
// @route   POST /api/v1/patient/log/sleep
// @access  Private (Patient)
exports.logSleep = async (req, res) => {
  try {
    const { hours } = req.body; // Get hours from request
    const today = getTodayDate();

    let log = await DailyLog.findOne({ user: req.user._id, date: today });

    if (!log) {
      // Create new log if it doesn't exist
      log = await DailyLog.create({
        user: req.user._id,
        date: today,
        sleep: hours,
      });
    } else {
      // Update existing log (Overwriting sleep allows users to correct mistakes)
      log.sleep = parseFloat(hours);
      await log.save();
    }

    res.json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
