const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;




router.post('/signup', async (req, res) => {
    try {


        const { email, password, name } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Invalid syntex" })
        }
        let emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.status(403).json({ status: 403, message: "User already exist" })
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(password, salt);



        let user = await User.create({ name, email, password: hashPassword });
        if (user) {
            res.send(user)
        }

    } catch (error) {
        res.status(400).json(error)
    }

})



router.post('/login', passport.authenticate('local'), async (req, res) => {
    res.cookie('jwt', req.user.token, { expires: new Date(Date.now() + 36000000), httpOnly: true })
    res.send(req.user);
});


router.get('/check', passport.authenticate('jwt'), async (req, res) => {
    if(req.user){
        res.json({ data: req.user });

    }
    else{
        res.status(401).json({status:401})
    }
});



router.put('/updateUser/', async (req, res) => {
    try {
        const user = req.body;
        let { id } = req.user;
        console.log(user);



        let updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

        if (updatedUser) {
            return res.status(200).send(updatedUser);
        }



    } catch (error) {
        res.status(400).json(error)
    }

})





module.exports = router