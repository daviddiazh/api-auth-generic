require('dotenv').config();

const config = {
    port: process.env.PORT || 8080,
    dbUrl: process.env.MONGODB_URI,
    apiKey: process.env.API_KEY
}

module.exports = { config };