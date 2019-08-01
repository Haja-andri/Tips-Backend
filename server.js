const express = require('express'); // instantiate express
const cors = require('cors'); // cors library for cross origin request control
const helmet = require('helmet') // helmet library to automate headers setting and secutities
const server = express(); // assign server to express instance
const workersEndPointsRoutes = require('./Routes/workersRoutes');
const customersEndPointsRoutes = require('./Routes/customersRoutes');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ api: 'running' });
  });

workersEndPointsRoutes(server);
customersEndPointsRoutes(server);

module.exports = server; // export to calling function (index.js in this case)