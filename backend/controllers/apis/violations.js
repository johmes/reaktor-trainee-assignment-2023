const asyncHandler = require('express-async-handler')
const { checkIfInNDZ } = require('../../functions/createViolation')
const Violation = require('../../models/Violation')
const { droneData } = require('./drones')
const { findPilot } = require('./pilots')

const constructViolation = async (drone, timestamp) => {
  const getDroneDistParams = checkIfInNDZ(drone.positionX, drone.positionY)
  const { closestDistance, isViolating } = getDroneDistParams
  const timestampInMillis = new Date(timestamp).getUTCMilliseconds
  const pilot = await findPilot(drone.serialNumber)
    .then(pilot => { return pilot })
    .catch(error => { throw new Error(error) })
  const { firstName, lastName, phoneNumber, email } = pilot

  return {
    data: {
      pilotName: `${firstName} ${lastName}`,
      pilotPhoneNumber: phoneNumber,
      pilotEmail: email,
      closestDistance,
      timestampInMillis,
    },
    isViolating: isViolating
  }
}

const findViolations = async () => {
  const currentTime = Date.now()
  const violations = await Violation
    .find({}, { _id: 0 })
    .where('timestamp')
    .sort({ timestamp: -1 })
  return violations
}

const createViolation = async (data) => {
  const { pilotName, pilotPhoneNumber, pilotEmail, closestDistance, timestamp } = data
  const violation = await Violation.create({
    pilotName,
    pilotPhoneNumber,
    pilotEmail,
    closestDistance,
    timestamp
  })
  return violation
}


// @desc Get violations newer than 10 minutes and response with json
// @route GET /api/violations
const getViolations = asyncHandler(async (req, res) => {
  const violations = await findViolations()
  res.status(200).json(violations)
})


const getViolationSocketData = async (callback) => {
  const list = await findViolations()
  if (callback != undefined) {
    callback(list)
  }
}


const putViolationsTodb = async () => {
  // Drone data is in drones.capture.drone
  const capture = await droneData().then(drones => { return drones.report.capture })
  const drones = capture.drone
  const snapshotTimestamp = capture['@_snapshotTimestamp']
  const violationsList = []
  // TODO: TypeError: drones.forEach is not a function
  drones.forEach(async drone => {
    const newViolationObject = await constructViolation(drone, snapshotTimestamp)
    if (newViolationObject.isViolating) {
      const violation = await createViolation(newViolationObject.data)
      violationsList.push(violation)
    }
  })
  return violationsList
}


// @desc Set violations to MongoDB
// @route POST /api/violations
const setViolations = async (req, res) => {
  try {
    // res.set('Content-Type', 'application/x-www-form-urlencoded')
    const listOfViolations = await putViolationsTodb()
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
  putViolationsTodb
}