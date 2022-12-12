const asyncHandler = require('express-async-handler')
const axios = require('axios');
const { xmlparser } = require('../../config/xmlparser');

const dronesUrl = "https://assignments.reaktor.com/birdnest/drones";

// @desc Get drone data
// @route GET /api/drones
const getDrones = asyncHandler(async (req, res, next) => {
  await axios.get(dronesUrl).then(result => {
    let obj = xmlparser(result.data)
    return res.status(200).json(obj)
  }).catch(error => {
    next(error)
  })
})

module.exports = { getDrones }