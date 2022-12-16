const axios = require('axios');
const { xmlparser } = require('../../config/xmlparser');

const dronesUrl = "https://assignments.reaktor.com/birdnest/drones";

const droneData = async () => {
  return await axios
    .get(dronesUrl)
    .then(drones => {
      let obj = xmlparser(drones.data)
      return obj.report.capture
    })
}

module.exports = { droneData }