const errorHandler = require('errorhandler')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const connectDB = require('./config/db.js')
const routes = require('./routes')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
connectDB()

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

app.set('port', PORT).set('host', HOST)

routes.init(app, server)
app.use(cors).use(errorHandler)

server.listen(PORT, () => {
  const host = app.get('host')
  const port = app.get('port')

  console.log("Server in %s running on port %s ", host, port)
});