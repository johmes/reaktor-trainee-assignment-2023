const express = require('express')
const path = require('path')
const apiRouter = require('./apis')
const frontendPath = path.join(__dirname, "../../", "frontend/build")


const init = (app) => {
  app.use('/api', apiRouter)
  app.use('/', express.static(frontendPath))
}

module.exports = {
  init: init,
}