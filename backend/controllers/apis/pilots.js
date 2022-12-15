const asyncHandler = require('express-async-handler')
const axios = require('axios');

const pilotsUrl = "https://assignments.reaktor.com/birdnest/pilots/";

const findPilot = async (serialNumber) => {
  return await axios
    .get(`${pilotsUrl}${serialNumber}`)
    .then(result => { return result.data })
}


// @desc Get pilot data
// @route GET /api/pilots/:serialNumber
const getPilot = asyncHandler(async (req, res, next) => {
  await findPilot(req.params.serialNumber).then(pilot => {
    res.status(201).json(pilot)
  }).catch(error => {
    next(error)
  })
})

module.exports = { getPilot, findPilot }