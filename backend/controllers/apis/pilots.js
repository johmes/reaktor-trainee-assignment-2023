const axios = require('axios');

const pilotsUrl = "https://assignments.reaktor.com/birdnest/pilots/";

const findPilot = async (serialNumber) => {
  return await axios
    .get(`${pilotsUrl}${serialNumber}`)
    .then(result => { return result.data })
}

module.exports = { findPilot }