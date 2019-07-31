const Customers = require('../data/models/customersModel');
const bcrypt = require('bcrypt');
const token = require('../utils/token');

const { authenticate } = require('../utils/authenticate');

module.exports = server => {
    // register a new customer (optional)
    server.post('/api/customers', register); 
    // customer login (optional)
    server.post('/api/customers/login', login); 
    // get a customer payments history
    server.get('/api/customers/:id/payments', authenticate, getPaymentsHistory); 
    // post a request for customer to logout
    server.post('/api/customers/:id/logout', authenticate, logout); 
    // delete a customer profile
    server.delete('/api/customers/:id/delete', deleteCustomer);
};

// workers registration 
async function register(req, res) {
    const { 
        name, 
        first_name, 
        email 
    } = req.body

    if(
        !name || 
        !first_name ||
        !email
        ){
        return res.status(400).json({ message: "Please fill all required fields for a customer" })
    }
    else {
        try {
            const customerToAdd = req.body;
            const newCustomer = await Customers.add(customerToAdd);
            res.status(200).json(newCustomer);
        } catch (error) {
            const err = {
                message: error.message,
            };
            res.status(500).json(err);
        }    
    }
}

// workers login point to access sensitive data
function login (req, res) {

}

// get the account that belong to a worker
async function getPaymentsHistory(req, res) {
    
}

async function logout (req, res){
    const workerId = req.params.id;
    try {
        await Workers.removeWorkerToken(workerId);
        const workerData = await Workers.findById(workerId);
        res.status(200).json(`See you next time ${workerData[0].name} ${workerData[0].first_name}`)
    } catch (error) {
        const err = {
            message: error.message,
        };
        res.status(500).json(err);
    }
}

async function deleteCustomer (req, res) {

}