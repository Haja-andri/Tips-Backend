// const Workers = require('../database/workersModel');

module.exports = server => {
  // register a new worker
  server.post('/api/worker/register', register); 
  // workers login
  server.post('/api/worker/login', login); 
  // get all workers from the DB
  server.get('/api/workers', getWorkers); 
  // get a worker account info
  server.get('/api/workers/:id/account', getWorkersAccount); 
};

function register(req, res) {
    res.json('workers register enpoint');
}

function login(req, res) {
    res.json('workers login enpoint');
}

function getWorkers(req, res) {
    res.json('get all workers enpoint');
}

function getWorkersAccount(req, res) {
    res.json('get get Workers Account enpoint');
}