const calculateDist = (nestCoords, droneCoords) => {
  // 100 meter radius * 1000. 1000 units = 1 meter
  const NDZRadius = 100 * 1000;
  const a = nestCoords.x - droneCoords.x;
  const b = nestCoords.y - droneCoords.y;
  return {
    ndz: Math.hypot(a, b) < NDZRadius,
    distance: Math.hypot(a, b)
  };
}

module.exports = { calculateDist };