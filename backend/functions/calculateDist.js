const calculateDist = (nestCoords, droneCoords) => {
  const a = nestCoords.x - droneCoords.x;
  const b = nestCoords.y - droneCoords.y;
  return Math.hypot(a, b);
}

module.exports = { calculateDist };