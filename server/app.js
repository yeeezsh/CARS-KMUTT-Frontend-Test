/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const http = require('http');
const path = require('path');

const EXTERNAL_PORT = 5000;
const DIST_PATH = '../dist';
const STATIC_FILES_PATH = path.join(__dirname, DIST_PATH);
const app = express();
const server = http.createServer(app);

app.use('/', express.static(STATIC_FILES_PATH));
app.get('*', (_req, res) =>
  res.sendFile(path.join(STATIC_FILES_PATH, 'index.html')),
);

server.listen(EXTERNAL_PORT, () =>
  console.log('server started at ', EXTERNAL_PORT),
);
