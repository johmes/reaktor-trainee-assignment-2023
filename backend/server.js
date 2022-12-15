const errorHandler = require('errorhandler')
const routes = require('./routes')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db.js')
const { app, server } = require('./config/server-init')

dotenv.config()

const start = async () => {
  const PORT = process.env.PORT || 3000
  const HOST = process.env.HOST || 'localhost'

  await connectDB()

  app.set('port', PORT).set('host', HOST)

  routes.init(app)

  app.use(cors).use(errorHandler)

  server.listen(PORT, () => {
    const host = app.get('host')
    const port = app.get('port')
    console.log("Server in %s running on port %s ", host, port)
  });
}

start()




