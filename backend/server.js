const path = require('path');
const axios = require('axios');
const express = require('express');
const errorHandler = require('errorhandler');


const isProduction = process.env.NODE_ENV === 'production';

const app = express();
const PORT = process.env.PORT || 3000

const dronesUrl = "https://assignments.reaktor.com/birdnest/drones";

const frontendPath = path.join(__dirname, "..", "frontend/build");
app.use(express.static(frontendPath));

if (isProduction) {
  app.use(errorHandler());
} else {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}

app.get('/drones', (req, res, next) => {
  axios.get(dronesUrl).then(result => {
    res.header('Content-Type', 'application/xml');
    res.status(200);
    return res.send(result.data);
  }).catch(error => {
    res.status(error.response.status).send(error.response.statusText)
  })
});


app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'))
});


const server = app.listen(PORT, () => {
  const host = server.address().address
  const port = server.address().port

  console.log("Server in %s running on port %s ", host, port);
});