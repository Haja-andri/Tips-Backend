const Workers = require('../data/models/workersModel');
const bcrypt = require('bcrypt');

module.exports = server => {
  // register a new worker
  server.post('/api/workers', register); 
  // workers login
  server.post('/api/worker/login', login); 
  // get all workers from the DB
  server.get('/api/workers', getWorkers); 
  // get a worker account info
  server.get('/api/workers/:id/account', getWorkersAccount); 
};

async function register(req, res) {
    const { 
        name, 
        first_name, 
        job_title, 
        email, 
        tagline, 
        password, 
    } = req.body

    if(
        !name || 
        !first_name ||
        !job_title ||
        !email || 
        !tagline ||
        !password
        ){
        return res.status(400).json({ message: "Please fill all required fields for a worker" })
    }
    else {
        try {
            const workerToAdd = req.body;
            // pasword encryption before storing
            workerToAdd.password = bcrypt.hashSync(workerToAdd.password, 12)
            const newWorker = await Workers.add(workerToAdd);
            res.status(200).json(newWorker);
        } catch (error) {
            const err = {
                message: error.message,
                stack: error.stack,
            };
            res.status(500).json(err);
        }    
    }
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