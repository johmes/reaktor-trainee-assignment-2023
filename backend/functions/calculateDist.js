const calculateDist = (nestCoords, droneCoords) => {
  // 100 meter radius
  const NDZRadius = 100;
  const a = nestCoords.x - droneCoords.x;
  const b = nestCoords.y - droneCoords.y;
  const hypot = Math.ceil(Math.hypot(a, b) / 1000)
  return {
    ndz: hypot <= NDZRadius,
    distance: hypot.toFixed(0)
  };
}

module.exports = { calculateDist };