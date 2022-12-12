const { getDrones } = require("./drones")
const { getViolations, setViolations } = require("./violations")
const { getPilots } = require("./pilots")

module.exports = {
  getDrones,
  getPilots,
  getViolations,
  setViolations
}
