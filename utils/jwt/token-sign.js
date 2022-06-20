const jwt = require('jsonwebtoken');

const secret = 'miclavesecreta';
const payload = {
    sub: 1,
    role: 'client',
}

function signToken (payload, secret) {
    return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
//console.log('TOKEN: ', token);