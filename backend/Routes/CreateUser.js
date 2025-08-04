const express = require('express');
const User = require('../models/User')
const Router = express.Router();
const bcrypt = require ('bcrypt');
// Validatiion are done by this 
const { body, validationResult } = require('express-validator');



Router.post('/createuser',
//    This all this is done by express-validator (validations)
    body('email').isEmail(),
    body('name', 'Name should be 5 characters long').isLength({ min: 5 }),
    body('password', 'Password must be 8 digit long').isLength({ min: 8 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password,salt);
        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                location: req.body.location,
                password: securePassword
            })
            res.json({ success: true })
        } catch (error) {
            console.error("Server Error:", error.message);
            res.status(500).json({ success: false, error: error.message });
        }
    })

module.exports = Router;