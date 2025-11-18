const User = require("../models/User");
const DailyLog = require("../models/DailyLog");

// @desc    Get all assigned patients and their compliance status
// @route   GET /api/v1/provider/patients
// @access  Private (Provider only)
exports.getPatients = async (req, res) => {
  try {
    // 1. Security Check: Ensure user is a Provider
    if (req.user.role !== "provider") {
      return res.status(403).json({ message: "Access denied: Providers only" });
    }

    // 2. Fetch all users with role 'patient'
    const patients = await User.find({ role: "patient" }).select("-password");

    // 3. Calculate compliance for each patient
    // Note: In a real app, this would be more complex. For MVP, we check today's steps.
    const today = new Date(new Date().toISOString().split("T")[0]); // Date object for query

    const patientData = await Promise.all(
      patients.map(async (patient) => {
        const log = await DailyLog.findOne({ user: patient._id, date: today });

        let status = "Low"; // Default
        let steps = 0;

        if (log) {
          steps = log.steps;
          if (steps >= 4000) status = "High"; // Green
          else if (steps >= 2000) status = "Medium"; // Yellow
        }

        return {
          id: patient._id,
          name: patient.profile?.name || patient.email,
          lastCheckup: "2025-11-01", // Static mock data for MVP
          dailyAvgSteps: steps,
          complianceStatus: status,
        };
      })
    );

    res.json(patientData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
