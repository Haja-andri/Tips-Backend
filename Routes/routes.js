const Workers = require('../data/models/workersModel');

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

async function getWorkers(req, res) {
    try {
        const workers = await Workers.getAll();
        res.status(200).json(workers);
    } catch (error) {
        const err = {
            message: error.message,
            stack: error.stack,
        };
        res.status(500).json(err);
    }
}

function getWorkersAccount(req, res) {
    res.json('get get Workers Account enpoint');
}