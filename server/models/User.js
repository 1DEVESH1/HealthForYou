// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['patient', 'provider'], required: true },
    
    // Expanded Profile Section [cite: 11, 20]
    profile: {
      name: { type: String },
      age: { type: Number },
      gender: { type: String },
      allergies: { type: String, default: '' },    // Comma separated string for MVP
      medications: { type: String, default: '' },  // Comma separated string for MVP
    },

    // New Wellness Goals Section [cite: 8, 70]
    wellnessGoals: {
      steps: { type: Number, default: 6000 },
      water: { type: Number, default: 8 },
      sleep: { type: Number, default: 7 },
    }
  },
  { timestamps: true }
);

// Password Hashing Middleware
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);