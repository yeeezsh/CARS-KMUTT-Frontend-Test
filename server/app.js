/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const http = require('http');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');
const compression = require('compression');

const EXTERNAL_PORT = 5000;
const DIST_PATH = '../dist';
const STATIC_FILES_PATH = path.join(__dirname, DIST_PATH);

if (cluster.isMaster) {
  console.log('master frontend started');
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express();
  const server = http.createServer(app);

  app.use(compression());
  app.use('/', express.static(STATIC_FILES_PATH));
  app.get('*', (_req, res) =>
    res.sendFile(path.join(STATIC_FILES_PATH, 'index.html')),
  );

  server.listen(EXTERNAL_PORT, () =>
    console.log('server started at ', EXTERNAL_PORT),
  );
  console.log(`worker ${process.pid} started`);
}
