const asyncHandler = require('express-async-handler')
const axios = require('axios');
const { xmlparser } = require('../../config/xmlparser');

const dronesUrl = "https://assignments.reaktor.com/birdnest/drones";

const droneData = async () => {
  return await axios
    .get(dronesUrl)
    .then(drones => {
      let obj = xmlparser(drones.data)
      return obj.report.capture
    })
}

// @desc Get drone data
// @route GET /api/drones
const getDrones = asyncHandler(async (_, res, next) => {
  await droneData().then(drones => {
    res.status(200).json(drones)
  }).catch(error => {
    next(error)
  })
})

module.exports = { getDrones, droneData }