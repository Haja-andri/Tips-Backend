const express = require('express'); // instantiate express
const server = express(); // assign server to express instance
server.use(express.json()); // use json as stream format

module.exports = server; // export to calling function (index.js in this case)