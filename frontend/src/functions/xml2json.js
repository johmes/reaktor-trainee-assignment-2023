const xml2json = (elements) => {
  const listOfDrones = [];
  for (let i = 0; i < elements.length; i++) {
    const drone = elements.item(i);
    const serialNumber = drone.getElementsByTagName('serialNumber')[0].textContent;
    const positionX = drone.getElementsByTagName('positionX')[0].textContent;
    const positionY = drone.getElementsByTagName('positionY')[0].textContent;
    const droneObject = {
      serialNumber: serialNumber,
      positionX: positionX,
      positionY: positionY
    }
    listOfDrones.push(droneObject)
  }
  return listOfDrones;
}

export default xml2json