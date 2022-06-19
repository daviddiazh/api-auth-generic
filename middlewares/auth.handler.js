
const { config } = require('../config/index.js');

const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['api'];
    if (apiKey === config.apiKey) {
        next();
    } else {
        next(res.status(401).send('Unauthorized'));
    }
}

module.exports = { checkApiKey }