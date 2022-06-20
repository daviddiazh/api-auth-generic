const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routes/user.router')

const { checkApiKey } = require('./middlewares/auth.handler');
const passport = require('passport');
const { session } = require('passport');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

require('./utils/auth/index');

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Auth API, by David Diaz!');
})

app.use('/api/auth', userRouter)

//? This is a example for routes blocked!
app.get('/api/auth/testMiddleware', 
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        try {
            res.status(200).json('You are authorized!');
        } catch (error) {
            next(error)
        }
    }
)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));


app.listen(port, () => {
    console.log(`Mi port ${port}`);
});