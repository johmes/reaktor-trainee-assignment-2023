const { checkIfInNDZ } = require('../../functions/checkIfInNDZ')
const Violation = require('../../models/Violation')
const { findPilot } = require('./pilots')

const constructViolation = async (drone, timestamp) => {
  const { serialNumber, positionX, positionY } = drone

  const getDroneDistParams = checkIfInNDZ(positionX, positionY)
  const { distance, inNDZ } = getDroneDistParams
  const timestampInMillis = Date.parse(timestamp)

  const pilot = await findPilot(serialNumber)
    .then(pilot => { return pilot })
    .catch(error => { throw new Error(error) })
  const { firstName, lastName, phoneNumber, email } = pilot

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
    .gte(currentTime - 660000)
    .sort({ timestamp: -1 })
  return violations
}

const fetchToDB = async violations => {
  Promise.all(violations).then(async result => {
    result.forEach(async violation => {
      if (violation.inNDZ) {
        console.log(`Violation detected: ${violation.data.pilotName} ${violation.data.closestDistance} m`)
        Violation.findOne(
          { 'pilotName': violation.data.pilotName },
          { 'sort': { timestamp: -1 } },
          { 'projection': { '_id': 1, 'closestDistance': 1, 'timestamp': 1, 'pilotName': 1 } },
          (err, doc) => handleUpdate(err, doc, violation.data)
        )
      }
    })
  })
}

const handleUpdate = (err, doc, data) => {
  if (doc) {
    const latestDistance = doc.closestDistance
    if (latestDistance > data.closestDistance) {
      console.log("Updated ", doc.pilotName + " from " + latestDistance + " m" + " to " + data.closestDistance + " m")
      Violation.findOneAndUpdate(
        { pilotEmail: data.pilotEmail },
        { closestDistance: data.closestDistance, timestamp: data.timestamp },
        (err) => { if (err) { throw new Error(err) } })
    }
  } else {
    Violation.create(data)
  }
  if (err) { throw new Error(err) }
}

const getViolationSocketData = async callback => {
  const violationList = await findViolations()
  if (callback != undefined) {
    callback(violationList)
  }
}

// @desc Create violations from data of drones and fetch to MongoDB
const createViolations = (capture) => {
  /** 
   * Check if drone is violating NDZ and 
   * add to violationsList 
   * Create violation object with constructViolation 
   * function
   * */
  let violationList = new Array()

  const createViolation = async (drone) => {
    return constructViolation(drone, capture['@_snapshotTimestamp'])
      .then(violationObject => {
        const data = violationObject.data

        const violation = new Violation({
          pilotName: data.pilotName,
          pilotPhoneNumber: data.pilotPhoneNumber,
          pilotEmail: data.pilotEmail,
          closestDistance: data.closestDistance,
          timestamp: data.timestamp,
        })
        return {
          data: violation,
          inNDZ: violationObject.inNDZ
        }
      })
  }

  capture.drone.forEach(drone => {
    const violation = createViolation(drone)
      .then(result => {
        return result
      })
    violationList.push(violation)
  })

  return fetchToDB(violationList)
}

module.exports = {
  getViolationSocketData,
  createViolations
}