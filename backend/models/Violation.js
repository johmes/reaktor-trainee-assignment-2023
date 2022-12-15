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
// Set TTL index to expire entries after 1 hour
module.exports = mongoose.model('Violation', ViolationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 }))