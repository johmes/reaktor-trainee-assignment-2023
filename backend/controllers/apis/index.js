const { getDrones } = require("./drones")
const { getViolations, setViolations } = require("./violations")
const { getPilot } = require("./pilots")

module.exports = {
  getDrones,
  getPilot,
  getViolations,
  setViolations
}
