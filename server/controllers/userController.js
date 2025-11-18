// server/controllers/userController.js
const User = require('../models/User');

// @desc    Get User Profile & Goals
// @route   GET /api/v1/user/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
        profile: user.profile,
        wellnessGoals: user.wellnessGoals
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update User Profile
// @route   PUT /api/v1/user/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // Update Profile Fields
      user.profile.name = req.body.name || user.profile.name;
      user.profile.age = req.body.age || user.profile.age;
      user.profile.gender = req.body.gender || user.profile.gender;
      user.profile.allergies = req.body.allergies || user.profile.allergies;
      user.profile.medications = req.body.medications || user.profile.medications;

      // Update Wellness Goals if provided
      if (req.body.wellnessGoals) {
        user.wellnessGoals.steps = req.body.wellnessGoals.steps || user.wellnessGoals.steps;
        user.wellnessGoals.water = req.body.wellnessGoals.water || user.wellnessGoals.water;
        user.wellnessGoals.sleep = req.body.wellnessGoals.sleep || user.wellnessGoals.sleep;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        email: updatedUser.email,
        profile: updatedUser.profile,
        wellnessGoals: updatedUser.wellnessGoals,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};