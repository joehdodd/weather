const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const dotEnv = require('dotenv').config({ path: '.env' });
const axios = require('axios');
const bodyParser = require('body-parser');
const api = require('./api');
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
  // Answer API requests.
  app.get('/api', api.main);
  app.get('/api/gm', api.gm);
  app.get('/api/ds', api.ds);
  // All remaining requests return the React app, so it can handle routing.
  app.get('*', api.ra);

  app.listen(PORT, function () {
    console.error(`💻  Node Server Running || Listening on port ${PORT}`);
  });


}
