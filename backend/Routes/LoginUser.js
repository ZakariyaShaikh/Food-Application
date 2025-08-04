const express = require('express');
const User = require('../models/User')
const Router = express.Router();
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken')
// Validatiion are done by this 
const { body, validationResult } = require('express-validator');
const SecretKey = "qwertyuioplkjhgfdsazxcvbnmqwertyuioplkjhgfdsazxcvbnm"



Router.post('/loginuser',
    [body('email').isEmail(),
    body('password', 'Password must be 8 digit long').isLength({ min: 8 })], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        try {
            let userData = await User.findOne({
                email: req.body.email
            })
            console.log(userData)
            if (!userData) {
                return res.status(400).json({ success: false, error: " Email is not valid" });
            }
            const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ success: false, error: " Password is incorrect" });
            }

            const data = {
                user :{
                    id : userData.id
                }
            }
            const authtoken = jwt.sign(data,SecretKey)
            return res.json({ success: true, authtoken:authtoken });
        } catch (error) {
            console.error("Server Error:", error.message);
            res.status(500).json({ success: false, error: error.message });
        }
    })

module.exports = Router;