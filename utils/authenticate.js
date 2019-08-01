const jwt = require('jsonwebtoken');
const Workers = require('../data/models/workersModel')
const Customers = require('../data/models/customersModel')

const jwtKey = process.env.SALT;

// quickly see what this file exports
module.exports = {
    authenticate,
    setProfileToCustomer,
    setProfileToWorker
};

// Function used by protected endpoints before procession futher
function authenticate(req, res, next) {
    // check Authenrization from request header
    const token = req.get('Authorization');
    if (token) {
    jwt.verify(token, jwtKey, async (err, decoded) => {
        if (err){
            return res.status(401).json({
                error: 'We failed to identify you',
            });
        } 
        req.decoded = decoded;
        // if the token is valid, we also make sure it matches the current user entry 
        // in the db to prevent workers using other users token
        let alreadyAToken = [];
        if(req.profile === 'customer') {
            alreadyAToken = await Customers.findTokenByCustomerId(req.params.id);
        }
        else if (req.profile === 'worker') {
            alreadyAToken = await Workers.findTokenByWorkerId(req.params.id);
        } 
        if(alreadyAToken.length > 0 && token === alreadyAToken[0].token){
            // the only happy path as the received token matches with the recorded token in the db
            next();
        }
        else {
            return res.status(401).json({
                error: 'You must logged in with the correct credential',
            });
        }
    });
    } else {
        return res.status(401).json({
            error: 'This access is protected, you must login before',
        });
    }
}

function setProfileToCustomer (req, res, next){
    req.profile = 'customer';
    next();
}

function setProfileToWorker (req, res, next) {
    req.profile = 'worker';
    next();
}
