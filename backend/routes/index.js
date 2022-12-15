const express = require('express')
const { Server } = require('socket.io')
const path = require('path')
const _ = require('underscore')
const bodyParser = require('body-parser')
const apiRouter = require('./apis')
const { getViolationSocketData, putViolationsTodb } = require('../controllers/apis/violations')
const frontendPath = path.join(__dirname, "../../", "frontend/build")

const init = (app, server) => {
  const io = new Server(server)
  const clients = {}

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use('/', express.static(frontendPath))
  app.use('/api', apiRouter)

  io.sockets.on('connection', (socket) => {
    console.log(`User ${socket.id} connected, total clients: ${_.size(clients)}`)
    clients[socket.id] = true

    socket.on('ready', () => {

      getViolationSocketData((data) => {
        console.log('Send violations to ' + socket.id)
        socket.emit('violationData', data)
      })

      socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected, total clients: ${_.size(clients)}`)
        delete clients[socket.id]
      })
    })

  })

  setInterval(() => {
    if (_.size(clients) == 0) return
    putViolationsTodb()
    getViolationSocketData((data) => io.sockets.emit('violationData', data))
  }, 2000)
}

module.exports = {
  init: init,
}