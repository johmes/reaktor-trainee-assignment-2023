const { calculateDist } = require("./calculatedist");

const checkIfInNDZ = (posX, posY) => {
  const nestCoords = { x: 250000, y: 250000 }
  const droneCoords = { x: posX, y: posY }
  const distObj = calculateDist(nestCoords, droneCoords)
  return {
    inNDZ: distObj.ndz,
    distance: distObj.distance
  };
}

module.exports = { checkIfInNDZ };