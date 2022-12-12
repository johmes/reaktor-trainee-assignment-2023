  // origin of nest
  const nestCoords = { x: 250000, y: 250000 }
  // 100 meter radius * 1000. 1000 units = 1 meter
  const NDZRadius = 100 * 1000;
  const drones = useGetDroneData();
  const pilotData = useGetPilotData();

  const violations = [];
  
  drones.forEach(drone => {
    const coords = {
      x: drone.positionX,
      y: drone.positionY
    };

  });