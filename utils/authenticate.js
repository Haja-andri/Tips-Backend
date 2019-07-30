const jwt = require('jsonwebtoken');

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
    jwt.verify(token, jwtKey, (err, decoded) => {
        if (err) return res.status(401).json(err);
        req.decoded = decoded;
        next();
    });
    } else {
        return res.status(401).json({
            error: 'This access is protected, you must login before',
        });
    }
}
