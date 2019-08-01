const Customers = require('../data/models/customersModel');
const bcrypt = require('bcrypt');
const token = require('../utils/token');

const { setProfileToCustomer, authenticate } = require('../utils/authenticate');

module.exports = server => {
    // register a new customer (password optional)
    server.post('/api/customers', register); 

    // add customer password (if customer want to be able to consult
    // payments history and/or register his payment card)
    server.post('/api/customers/:id/subscribe', subscribe); 

    // customer login (optional)
    server.post('/api/customers/login', login); 

    // get a customer payments history
    server.get('/api/customers/:id/payments', setProfileToCustomer, authenticate, getPaymentsHistory); 

    // post a request for customer to logout
    server.post('/api/customers/:id/logout', setProfileToCustomer, authenticate, logout); 

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

// customer login point to access payment history 
// and/or payment card recorded
function login (req, res) {
    // extract customer credential info
    const { username, password } = req.body;
    // in our case the username is the email of the customer
    Customers.findByFilter({email: username})
    .first()
    .then( async (customer) =>{
        console.log(password, customer.password)
        // since customer subsciption is optional
        // the customer may not have a password set yet
        // in that case he must subscribe first
        if(!customer.password){
            res.status(401).json({ message: 'You have not subscribed to this service yet, please subscibe first and then login again' });
        }
        else if (customer && bcrypt.compareSync(password, customer.password)) {
            // we generate a token for futur access
            const newToken = token.generateToken(customer);
            // we insert an entry in the customer_token table
            const customerToken = {
                customer_id: customer.id, 
                token:newToken
            };
            // we check if there is already a token
            const alreadyAToken = await Customers.findTokenByCustomerId(customerToken.customer_id);
            if(alreadyAToken.length > 0){
                // a token is already set for this customer, we update it
                Customers.updateCustomerToken(customerToken)
            }
            // insert a new token
            else await Customers.insertCustomerToken(customerToken);
            res.status(200).json({
                message: `Welcome ${customer.name} ${customer.first_name}!`,
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

// get the payments history that belong to a customer
async function getPaymentsHistory(req, res) {
    const customerId = req.params.id
    try {
        //first we get the customer info
        const customerData = await Customers.findById(customerId);
        // then we merge in the payments history
        const paymentsHistory = await Customers.getPaymentsHistory(customerId);
        customerData[0].payments_history = paymentsHistory;
        res.status(200).json({customerData})
    } catch (error) {
        const err = {
            message: error.message,
        };
            res.status(500).json(err);
    }    
}

async function logout (req, res){
    const customerId = req.params.id;
    try {
        await Customers.removeCustomerToken(customerId);
        const customerData = await Customers.findById(customerId);
        res.status(200).json(`See you next time ${customerData[0].name} ${customerData[0].first_name}`)
    } catch (error) {
        const err = {
            message: error.message,
        };
        res.status(500).json(err);
    }
}

async function deleteCustomer (req, res) {

}