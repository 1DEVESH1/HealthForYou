// server/models/DailyLog.js
const mongoose = require("mongoose");

const DailyLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date, // Changed to Date data type
      required: true,
    },
    steps: {
      type: Number,
      default: 0,
    },
    water: {
      type: Number, // in glasses
      default: 0,
    },
    sleep: {
      type: Number, // in hours
      default: 0,
    },
  },
  { timestamps: true }
);

// Ensure a user only has one log per date
DailyLogSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DailyLog", DailyLogSchema);
