const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const apiRouter = require('./apis')
const frontendPath = path.join(__dirname, "../../", "frontend/build")

const init = (app) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use('/', express.static(frontendPath))
  app.use('/api', apiRouter)
}

module.exports = {
  init: init,
}