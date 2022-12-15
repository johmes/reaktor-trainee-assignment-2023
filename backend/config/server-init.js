const app = require('express')()
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

module.exports = {
  app: app,
  server: server,
  io: io,
}