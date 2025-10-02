const fs = require('fs')
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const upload = require('../utils/uploadImg')

const router = express.Router()
require('../db')
const User = require('../Models/user')

// User Registering in Database 
router.post('/', upload.single('proImg'), async (req, res) => {
    const saltRounds = 10
    const hash = bcrypt.hashSync(req.body.password, saltRounds)     // password hashing
    const user = new User({
        name: req.body.name,
        dob: req.body.dob,
        email: req.body.email,
        password: hash,
        phNo: req.body.phNo,
        proImg: req.file?.filename
    })
    console.log(user.proImg)
    await user.save();                                   // save into database
    res.send({ message: 'User Profile Saved', user })
})

// User Login post
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (email != null && password != null) {
        const loginUser = await User.findOne({ email })
        const proImgURL = loginUser.proImg
            ? `${req.protocol}://${req.get('host')}/uploads/${loginUser.proImg}`
            : null;
        if (loginUser) {
            const isMatch = bcrypt.compareSync(password, loginUser.password)
            if (isMatch) {
                const token = jwt.sign({ _id: loginUser._id, email: loginUser.email }, process.env.JWT_SECRET)
                res.status(200).send({ message: "password matched.. Logged In Successfully", token, user: {
                _id: loginUser._id,
                name: loginUser.name,
                email: loginUser.email,
                phNo: loginUser.phNo,
                dob: loginUser.dob,
                proImg: proImgURL
            } })
            }
            else
                res.status(400).send({ message: "Password not Matched" })
        }
        else {
            res.status(400).send({ message: 'User not Found' })
        }
    }
    else {
        res.send.status(400)({ message: 'No body content' })
    }

})
module.exports = router