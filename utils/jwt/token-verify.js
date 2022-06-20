const jwt = require('jsonwebtoken');

const secret = 'miclavesecreta';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2NTU3NTYxNDR9.YRCf1Bv9z3o-g2l4LNu4sREwWCaHzA6kxFDYn67Loq4';

function verifyToken (token, secret) {
    return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
//console.log('VERIFY TOKEN: ', payload);