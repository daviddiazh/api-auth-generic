const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const userService = require('../services/user.service');
const userModel = require('../models/User');
const passport = require('passport');

const router = express.Router();

router.post('/signIn', 
    validatorHandler(userModel, 'body'),
    async (req, res, next) => {
        try {
            const bodyUser = req.body;
            const newUser = await userService.createUser(bodyUser);
            res.status(201).json(newUser);
        } catch (error) {
            next(error)
        }
    }
);

router.post('/login', 
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            res.json(req.user)
        } catch (error) {
            next(error);
        }
    }
);


module.exports = router;