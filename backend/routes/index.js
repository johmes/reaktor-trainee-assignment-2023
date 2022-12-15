const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const _ = require('underscore')
const apiRouter = require('./apis')
const frontendPath = path.join(__dirname, "../../", "frontend/build")
const { getViolationSocketData, createViolations } = require('../controllers/apis/violations')
const { io } = require('../config/server-init')
const { droneData } = require('../controllers/apis/drones')

const init = (app) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use('/', express.static(frontendPath))
  app.use('/api', apiRouter)

  const clients = {}

  io.sockets.on('connection', socket => {
    clients[socket.id] = true
    console.log(`User ${socket.id} connected, total clients: ${_.size(clients)}`)

    socket.on('ready', async () => {
      const capture = await droneData()
      .then(capture => {
        return capture
      }) // Drone data is in drones.capture.drone
      await createViolations(capture)
        .then(async () => {
          await getViolationSocketData(data => {
            socket.volatile.emit('violationData', data)
          })
        })
        .catch((error) => {
          throw new Error(error)
        })
      socket.on('disconnect', () => delete clients[socket.id])
    })

  })

  setInterval(async () => {
    if (_.size(clients) == 0) { return; }
    // drones from API
    const capture = await droneData()
      .then(capture => {
        return capture
      }) // Drone data is in drones.capture.drone
    await createViolations(capture)
      .then(async () => {
        await getViolationSocketData((data) => {
          io.sockets.emit('violationData', data)
        })
      })
      .catch((error) => {
        throw new Error(error)
      })
  }, 2000)
}

module.exports = {
  init: init,
}