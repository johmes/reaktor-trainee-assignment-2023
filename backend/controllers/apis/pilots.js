const asyncHandler = require('express-async-handler')
const axios = require('axios');

const pilotsUrl = "https://assignments.reaktor.com/birdnest/pilots/";

// @desc Get pilot data
// @route GET /api/pilots/:serialNumber
const getPilots = asyncHandler(async (req, res, next) => {
  await axios.get(`${pilotsUrl}${req.params.serialNumber}`).then(result => {
    return res.status(200).json(result.data)
  }).catch(error => {
    next(error)
  })
})

module.exports = { getPilots }