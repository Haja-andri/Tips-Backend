const Customers = require('../data/models/customersModel');
const bcrypt = require('bcrypt');
const token = require('../utils/token');

const { authenticate } = require('../utils/authenticate');

module.exports = server => {
    // register a new customer (password optional)
    server.post('/api/customers', register); 
    // add customer password (if customer want to be able to consult
    // payments history and/or register his payment card)
    server.post('/api/customers/:id/subscribe', subscribe); 
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

// customer login point to access sensitive data
async function subscribe (req, res) {
    const customer = {
        // pasword encryption before storing
        password: bcrypt.hashSync(req.body.password, 12),
        id: req.params.id
    }
    try {
        const updatedCustomer = await Customers.subsribe(customer);
        res.status(200).json(updatedCustomer);
    } catch (error) {
        const err = {
            message: error.message,
        };
        res.status(500).json(err);
    }

}

// customer login point to access sensitive data
function login (req, res) {

}

// get the payments history that belong to a customer
async function getPaymentsHistory(req, res) {
    
}

async function logout (req, res){
}

async function deleteCustomer (req, res) {

}