const mongoose = require('mongoose');

// main violation schema

const ViolationSchema = new mongoose.Schema(
  {
    pilotName: {
      type: String,
      required: true,
    },
    pilotPhoneNumber: {
      type: String,
      required: true,
    },
    pilotEmail: {
      type: String,
      unique: true,
      required: true,
    },
    closestDistance: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Violation', ViolationSchema)