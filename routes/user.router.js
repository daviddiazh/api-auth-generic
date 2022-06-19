const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const userService = require('../services/user.service');
const userModel = require('../models/User')

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
)


module.exports = router;