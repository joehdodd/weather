const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const dotEnv = require('dotenv').config({ path: '.env' });
const axios = require('axios');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
  // app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(bodyParser.json());
  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  // Proxy DS API calls.
  app.get('/api/ds', function (req, res) {
    let lat = req.query.lat;
    let long = req.query.long;
    console.log(lat, long);
    try {
      axios.get(`https://api.darksky.net/forecast/${process.env.REACT_APP_DSK}/${lat},${long}`)
      .then(response => {
        res.json(response.data);
      })
      .catch(err => {
        res.status(500).json({"message": 'Oops! An error occured with your request to the Dark Sky API!', "details": err})
      })
    } catch(err) {
      res.status(500).json({"message": 'Oops! An error occured with your request to the Dark Sky API', "details" : err})
    }
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`💻  Node Server Running || Listening on port ${PORT}`);
  });
}
