const Workers = require('../data/models/workersModel');
const bcrypt = require('bcrypt');
const token = require('../utils/token');

const { authenticate } = require('../utils/authenticate');

module.exports = server => {
    // register a new worker
    server.post('/api/workers', register); 
    // workers login
    server.post('/api/workers/login', login); 
    // get all workers from the DB
    server.get('/api/workers', getWorkers); 
    // get a worker account info
    server.get('/api/workers/:id/accounts', authenticate, getAccount); 
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
            };
            res.status(500).json(err);
        }    
    }
}

function login (req, res) {
    // extract worker credential info
    const { username, password } = req.body;
      // in our case the username is the email of the worker
    Workers.findByFilter({email: username})
    .first()
    .then( async (worker) =>{
        if (worker && bcrypt.compareSync(password, worker.password)) {
            // we generate a token for futur access
            const newToken = token.generateToken(worker);
            // we insert an entry in the workers_token table
            const workerToken = {
                worker_id: worker.id, 
                token:newToken
            };
            // we check if there is already a token
            const alreadyAToken = await Workers.findTokenByWorkerId(workerToken.worker_id);
            if(alreadyAToken.length > 0){
                // a token is already set for this worker, we update it
                Workers.updateWorkerToken(workerToken)
            }
            // insert a new token
            else await Workers.insertWorkerToken(workerToken);
            res.status(200).json({
                message: `Welcome ${worker.name} ${worker.first_name}!`,
                token: newToken
            });
        } 
        else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    })
    .catch(error =>{
    const err = {
        message: error.message,
    };
        res.status(500).json(err);
    });
}

async function getWorkers(req, res) {
    try {
        const workers = await Workers.getAll();
        res.status(200).json(workers);
    } catch (error) {
        const err = {
            message: error.message,
        };
        res.status(500).json(err);
    }
}

async function getAccount(req, res) {
    const workerId = req.params.id;
    try {
        const account = await Workers.getWorkersAccount(workerId);
        if(account.length === 0){
            res.status(200).json('There is no account yet associated to this profile, please add account to receive tips from cutomers');    
        } 
        else res.status(200).json(account);
    } catch (error) {
        const err = {
            message: error.message,
        };
        res.status(500).json(err);
    }
}