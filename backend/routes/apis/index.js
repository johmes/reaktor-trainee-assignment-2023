const express = require('express')
const router = express.Router()

const {
  getDrones,
  getViolations,
  getPilots,
  setViolations
} = require('../../controllers/apis/')

router.get('/drones', getDrones)
router.post('/violations', setViolations)
router.get('/violations', getViolations)
router.get('/pilots/:serialNumber', getPilots)

module.exports = router