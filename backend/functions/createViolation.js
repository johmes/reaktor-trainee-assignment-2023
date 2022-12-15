const { calculateDist } = require("./calculatedist");

const checkIfinNDZ = (posX, posY) => {
  // origin of nest
  const nestCoords = { x: 250000, y: 250000 }
  const distObj = calculateDist(nestCoords, { x: posX, y: posY })
  const isInNDZ = distObj.ndz;
  return {
    inNDZ: isInNDZ,
    distance: distObj.distance
  };
}

module.exports = { checkIfinNDZ };