const asyncHandler = require('express-async-handler')
const axios = require('axios');
const { xmlparser } = require('../../config/xmlparser');

const dronesUrl = "https://assignments.reaktor.com/birdnest/drones";

const droneData = async () =>
  await axios.get(dronesUrl).then(result => {
    let obj = xmlparser(result.data)
    return obj
  }).catch(error => {
    throw new Error(error)
  })

// @desc Get drone data
// @route GET /api/drones
const getDrones = asyncHandler(async (req, res, next) => {
  return res.status(200).json(drones())
})

module.exports = { getDrones, droneData }