const jwt = require('jsonwebtoken');
const Workers = require('../data/models/workersModel')

const jwtKey = process.env.SALT;

// quickly see what this file exports
module.exports = {
    authenticate,
};

// Function used by protected endpoints before procession futher
function authenticate(req, res, next) {
    // check Authenrization from request header
    const token = req.get('Authorization');
    if (token) {
    jwt.verify(token, jwtKey, async (err, decoded) => {
        if (err) return res.status(401).json(err);
        req.decoded = decoded;
        // if the token is valid, we also make sure it matches the current worker entry 
        // in the workers_token db to prevent workers using others token
        const alreadyAToken = await Workers.findTokenByWorkerId(req.params.id);
        if(alreadyAToken.length > 0 && token === alreadyAToken[0].token){
            // the received token matches with the recorded token in the db
            next();
        }
        else {
            return res.status(401).json({
                error: 'You must login with the correct credential',
            });
        }
    });
    } else {
        return res.status(401).json({
            error: 'This access is protected, you must login before',
        });
    }
}
