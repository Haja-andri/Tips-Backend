const jwt = require('jsonwebtoken');
const secret = require('./salt');

module.exports = {
    generateToken,
}

function generateToken(worker) {
    const payload = {
        subject: worker.id,
        username: worker.email,
    }
    const options = {
        expiresIn: '1d' // One day
    }
    return jwt.sign(payload, secret.jwtSalt, options);
}