const express = require('express')
const router = express.Router()

const {
  getDrones,
  getViolations,
  getPilot,
  setViolations
} = require('../../controllers/apis/')

router.get('/drones', getDrones)
router.post('/violations', setViolations)
router.get('/violations', getViolations)
router.get('/pilots/:serialNumber', getPilot)

module.exports = router