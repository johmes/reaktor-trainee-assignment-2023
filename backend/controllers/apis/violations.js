const asyncHandler = require('express-async-handler')
const Violation = require('../../models/Violation')
const { droneData } = require('./drones')
const { findPilot } = require('./pilots')

const constructViolation = async (drone) => {
  const pilot = await findPilot(drone.serialNumber)
    .then(pilot => { return pilot.data })
    .catch(error => { throw new Error(error) })
  const { pilotName, pilotPhoneNumber, pilotEmail } = pilot

  const getDroneDistParams = checkIfinNDZ(drone.positionX, drone.positionY)
  const closestDistance = getDroneDistParams.closestDistance
  const isViolating = getDroneDistParams.isViolating
  const timestamp = Date.now()


  return {
    data: {
      pilotName,
      pilotPhoneNumber,
      pilotEmail,
      closestDistance,
      timestamp,
    },
    isViolating: isViolating
  }
}

const findViolations = async () => {
  // Checks if timestamp is less that what is ten minutes ago
  const currentTime = Date.now()
  const violations = await Violation
    .find()
    .where('timestamp')
    .gte(currentTime - 600000)
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
  const violations = findViolations()
  res.status(200).json(violations)
})


const getViolationSocketData = (callback) => {
  const obj = findViolations()
  if (callback != undefined) {
    callback(obj)
  }
}

const putViolationsTodb = async () => {
  const drones = droneData().then(drones => { return drones })
  const violationsList = []
  // TODO: TypeError: drones.forEach is not a function
  drones.forEach(async drone => {
    const newViolationObject = await constructViolation(drone)

    if (newViolationObject.isViolating) {
      const violation = await createViolation(newViolationObject.data)
      violationsList.push(violation)
    }
  })
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