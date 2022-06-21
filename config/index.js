require('dotenv').config();

const config = {
    port: process.env.PORT || 8080,
    dbUrl: process.env.MONGODB_URI,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    fromEmailEmail: process.env.FROM_EMAIL_EMAIL,
    fromEmailPassword: process.env.FROM_EMAIL_PASSWORD,
}

module.exports = { config };