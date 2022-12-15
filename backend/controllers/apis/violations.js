const asyncHandler = require('express-async-handler')
const { checkIfInNDZ } = require('../../functions/checkIfInNDZ')
const Violation = require('../../models/Violation')
const { droneData } = require('./drones')
const { findPilot } = require('./pilots')

const constructViolation = async (drone, timestamp) => {
  const { serialNumber, positionX, positionY } = drone

  const getDroneDistParams = checkIfInNDZ(positionX, positionY)
  const { distance, inNDZ } = getDroneDistParams
  const timestampInMillis = Date.parse(timestamp)

  const pilot = await findPilot(serialNumber)
    .then(pilot => { return pilot })
    .catch(error => { throw new Error(error) })
  const { firstName = '', lastName = '', phoneNumber = '', email = '' } = pilot

  return {
    data: {
      pilotName: `${firstName} ${lastName}`,
      pilotPhoneNumber: phoneNumber,
      pilotEmail: email,
      closestDistance: distance,
      timestamp: timestampInMillis,
    },
    inNDZ: inNDZ
  }
}

const findViolations = async () => {
  const currentTime = Date.now()
  const violations = await Violation
    .find({}, { _id: 0 })
    .where('timestamp')
    .gte(currentTime - 600000)
    .sort({ timestamp: -1 })
  return violations
}

const fetchToDB = async violations => {
  return await Violation.insertMany(violations)
}

// @desc Get violations newer than 10 minutes and response with json
// @route GET /api/violations
const getViolations = asyncHandler(async (_, res) => {
  const violations = await findViolations()
  res.status(200).json(violations)
})

const getViolationSocketData = async callback => {
  const violationList = await findViolations()
  if (callback != undefined) {
    callback(violationList)
  }
}

// @desc Create violations from data of drones and fetch to MongoDB
const createViolations = (capture) => {
  // Check if drone is violating NDZ and add to violationsList
  //Create violation object with constructViolation function
  let violationList = new Array()
  capture.drone.forEach(drone => {
    constructViolation(drone, capture['@_snapshotTimestamp'])
      .then(violationObject => {
        const data = violationObject.data

        const violation = new Violation({
          pilotName: data.pilotName,
          pilotPhoneNumber: data.pilotPhoneNumber,
          pilotEmail: data.pilotEmail,
          closestDistance: data.closestDistance,
          timestamp: data.timestamp,
        })
        // if (newViolationObject.inNDZ) {
        // }
        return violation
      })
  })
  console.log("List of violations", violationList)
  return fetchToDB(violationList)
}


// @desc Set violations to MongoDB
// @route POST /api/violations
const setViolations = async (_, res) => {
  try {
    res.set('Content-Type', 'application/x-www-form-urlencoded')
    // drones from API
    const capture = await droneData()
      .then(capture => {
        return capture
      }) // Drone data is in drones.capture.drone
    const listOfViolations = createViolations(capture)
    res.status(201).json(listOfViolations)
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: 'Invalid data' })
  }
}

module.exports = {
  getViolations,
  setViolations,
  getViolationSocketData,
  createViolations
}