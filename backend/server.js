const errorHandler = require('errorhandler')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const connectDB = require('./config/db.js')
const routes = require('./routes')
const cors = require('cors')
const _ = require('underscore')
const dotenv = require('dotenv')
const { Server } = require('socket.io')
const { getViolationSocketData, putViolationsTodb } = require('./controllers/apis/violations')

dotenv.config()
connectDB()

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
const io = new Server(server)
const clients = {}

app.set('port', PORT).set('host', HOST)
routes.init(app, server)
app.use(cors).use(errorHandler)

io.on('connection', (socket) => {
  clients[socket.id] = true
  console.log(`User ${socket.id} connected, total clients: ${_.size(clients)}`)
  socket.on('ready', async () => {
    await getViolationSocketData((data) => {
      console.log('Send data to ' + socket.id)
      socket.volatile.emit('violationData', data)
    })

    socket.on('disconnect', () => {
      delete clients[socket.id]
      console.log(`User ${socket.id} disconnected, total clients: ${_.size(clients)}`)
    })
  })

})

setInterval(async () => {
  if (_.size(clients) == 0) { return }
  await putViolationsTodb().then(async () => {
    await getViolationSocketData((data) => {
      console.log('Broadcast data to all clients:', data)
      io.sockets.volatile.emit('violationData', data)
    })
  }).catch((error) => {
    throw new Error(error)
  })
}, 2000)

server.listen(PORT, () => {
  const host = app.get('host')
  const port = app.get('port')

  console.log("Server in %s running on port %s ", host, port)
});
