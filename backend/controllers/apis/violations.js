const asyncHandler = require('express-async-handler')
const Violation = require('../../models/Violation')

// @desc Get violations newer than 10 minutes and response with json
// @route GET /api/violations
const getViolations = asyncHandler(async (req, res) => {
  // Checks if timestamp is less that what is ten minutes ago
  const tenMinsAgo = new Date() - (10 * 60 * 1000)
  const violations = await Violation.find({ timestamp: { $lte: tenMinsAgo } })
  res.status(200).json(violations)
})

// @desc Set violations to MongoDB
// @route POST /api/violations
const setViolations = asyncHandler(async (req, res) => {
  console.log(req.body)
  // if (!req.body.pilotEmail) {
  //   res.status(400)
  //   throw new Error('Invalid request, add drone and pilot data')
  // }

  // const violation = await Violation.create({
  //   pilotName: req.body.pilotName,
  //   pilotEmail: req.body.pilotEmail,
  //   pilotPhoneNumber: req.body.pilotPhoneNumber,
  //   timestamp: req.body.timestamp,
  //   closestDistance: req.body.closestDistance,
  // })
  res.status(200).json({ message: req.body })
})

module.exports = { getViolations, setViolations }