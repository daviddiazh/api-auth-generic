const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const { checkApiKey } = require('./middlewares/auth.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Hair Room API!');
})

app.get('/api/auth/testMiddleware', checkApiKey, (req, res) => {
    res.send('You are authorized!');
})

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));


app.listen(port, () => {
    console.log(`Mi port ${port}`);
});