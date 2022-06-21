const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const validatorHandler = require('../middlewares/validator.handler');
const userService = require('../services/user.service');
const userModel = require('../models/User');

const { config } = require('./../config/index');
const router = express.Router();

router.post('/signIn', 
    validatorHandler(userModel, 'body'),
    async (req, res, next) => {
        try {
            const bodyUser = req.body;
            const newUser = await userService.createUser(bodyUser);
            await userService.sendEmail(newUser.email)
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
            const user = req.user;
            const payload = {
                id: user.id,
                role: user.role,
                //name: user.name
                //TODO: Here sends all the data of user.
            }
            const token = jwt.sign(payload, config.jwtSecret);
            res.json({ user, token })
        } catch (error) {
            next(error);
        }
    }
);


module.exports = router;