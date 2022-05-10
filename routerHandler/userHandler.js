const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dontenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model('User', userSchema);

//router
const router = express.Router();

//all router

router.get('/signUp', (req,res) => {
    res.send("Sign Up Route Hit")
})

router.post('/signup', async (req,res) => {

    try {

        const hashedPassword = await bcrypt.hash(req.body.password , 10)
         
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
            status: 'inactive'
        })

        await user.save();

        res.status(200).json({
            message: "Signup was successfull"
        })

    } catch {
        
        res.status(500).json({
            message: "Signup was Failed!"
        })

    }
    
})

router.post('/signin' , async(req,res) => {

    try {
        const user = await User.find({username: req.body.username});

        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password , user[0].password )
            
            if (isValidPassword) {
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id
                },process.env.jwt_secret , {
                    expiresIn : '1h'
                })

                res.status(200).json({
                    "access_token" : token,
                    "message" : "login successfull!"
                })

            } else {

                res.status(401).json({
                    "error" : "Authentication Failed!"
                })

            }
        }

    } catch (error) {
        
        res.status(401).json({
            message: "Authentication Failed!"
        })
        
    }
})


module.exports = router;