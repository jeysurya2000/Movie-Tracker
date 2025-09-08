const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const upload = require('../utils/uploadImg')

const router = express.Router()
require('../db')
const User = require('../Models/user')
const _SECRET = 'shhhhh'

// User Registering in Database 
router.post('/', upload.single('proImg'), async (req, res) => {
    const saltRounds = 10
    const hash = bcrypt.hashSync(req.body.password, saltRounds)     // password hashing
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        phNo: req.body.phNo,
        proImg: req.file.filename
    })
    await user.save();                                              // save into database
    res.send({ message: 'User Profile Saved', user })
})

// User Login post
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (email != null && password != null) {
        const loginUser = await User.findOne({ email })
        if (loginUser) {
            const isMatch = bcrypt.compareSync(password, loginUser.password)
            if (isMatch) {
                const token = jwt.sign({ _id: loginUser._id, email: loginUser.email }, _SECRET)
                res.send({ message: "password matched.. Logged In Successfully", token })
            }
            else
                res.send({ message: "Password not Matched" })
        }
        else {
            res.send({ message: 'User not Found' })
        }
    }
    else {
        res.send({ message: 'No body content' })
    }

})
module.exports = router