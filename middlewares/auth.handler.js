
const { config } = require('../config/index.js');

const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['api'];
    if (apiKey === config.apiKey) {
        next();
    } else {
        next(res.status(401).send('Unauthorized'));
    }
}

const checkAdminRole = (req, res, next) => {
    const user = req.user;

    if(user.role === 'admin'){
        next();
    } else {
        next(new Error('Tu rol no te permite hacer esta acción.'))
    }
}

const checkRoles = (...roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (roles.includes(user.role)) {
            next();
        } else {
            next(new Error('Tu rol no te permite hacer esta acción.'));
        }
    };
}
  

module.exports = { checkApiKey, checkAdminRole, checkRoles }