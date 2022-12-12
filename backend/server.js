const errorHandler = require('errorhandler')
const express = require('express');
const bodyParser = require('body-parser')
const connectDB = require('./config/db.js')
const routes = require('./routes')

connectDB()

const app = express();
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

app.set('port', PORT)
app.set('host', HOST)
routes.init(app)

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler)

// Create server
app.listen(PORT, () => {
  const host = app.get('host')
  const port = app.get('port')

  console.log("Server in %s running on port %s ", host, port)
});