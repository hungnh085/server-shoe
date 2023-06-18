const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user.js');
router.get('/', (req, res)=> res.send('USER'));
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if ( !username || !password)
        return res.status(400).json({
            success: false, message: 'Missing username and/or password'
        });
    try {
        const user = await User.findOne({username: username})
        if(user){
        return res
        .status(400)
        .json({
            success: false, message: 'Username already'
        })
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
        username,
        password: hashedPassword
    })
    const newu = await newUser.save();

    const accessToken = jwt.sign({userId:newUser._id}, process.env.ACCESS_TOKEN);
    res.status(200)
        .jsonp({
            accessToken , newu
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message:"Internal server error"
        })
    }
});
//login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if ( !username || !password)
        return res.status(400).json({
            success: false, message: 'Missing username and/or password'
        });
    try {
        const user = await User.findOne({username: username})
        if(!user){
        return res
        .status(400)
        .json({
            success: false, message: 'Incorrect username/password'
        })
    }
    const passwordValid = await argon2.verify(user.password, password);
    if(!passwordValid)
    return res.status(400).json({
        success: false, message: 'Incorrect username/password'
    });

    const accessToken = jwt.sign({userId:user._id}, process.env.ACCESS_TOKEN);
    res.status(200)
        .jsonp({
            accessToken , user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message:"Internal server error"
        })
    }
});
module.exports = router;