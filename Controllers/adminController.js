const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const users = require('../Models/user')
const movies = require('../Models/movie')

const user = {
    username: "jeysurya28@gmail.com",
    password: "Gayathri@123"
}
router.post('/adminLogin', (req, res) => {
    const reqUser = {
        username: req.body.username,
        password: req.body.password
    }
    if (reqUser.username) {
        if ((user.username == reqUser.username) && (reqUser.password == user.password)) {
            const token = jwt.sign({ admin: true }, process.env.JWT_SECRET)
            res.send({ message: "User Logged In Successfully", token })
        }
        else {
            res.send("username & password mismatch")
        }
    }
    else {
        res.send('No user')
    }
})

router.get('/viewUser', async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if (decode.admin) {
        const Users = await users.find({})
        res.send(Users)
    }
    else {
        res.send("Not a Admin Login as a Admin")
    }
})

router.put('/editUser/:id', async (req, res) => {
    const id = req.params.id
    const token = req.headers.authorization.slice(7)
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if (decode.admin) {
        const Users = await users.findOneAndUpdate(
            { _id: id },
            { $set: { name: req.body.name, email: req.body.email, phNo: req.body.phNo } },
            { new: true })
        res.send(`${Users.name} edited succesfully`)
    }
    else {
        res.send("Not a Admin Login as a Admin")
    }
})
router.delete('/deleteUser/:id', async (req, res) => {
    const id = req.params.id
    const token = req.headers.authorization.slice(7)
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if (decode.admin) {
        const user = await users.deleteOne({ _id: id })
        if (user.deletedCount === 1) {
            res.send({ message: `User Deleted Successfully`, user })
        }
        else
            res.send('User not found')
    }
    else
        res.send("Not a Admin Login as a Admin")
})

//Movies Manipulating
router.get('/viewMovies', async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if (decode.admin) {
        const movie = await movies.find({}).populate('user')
        res.send(movie)
    }
    else {
        res.send("Not a Admin Login as a Admin")
    }
})

router.put('/editMovie/:id', async (req, res) => {
    const id = req.params.id
    const token = req.headers.authorization.slice(7)
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if (decode.admin) {
        const movie = await movies.findOneAndUpdate(
            { _id: id },
            { $set: { name: req.body.name, desc: req.body.desc } },
            { new: true })
        res.send({ message: `${movie.name} edited succesfully`, movie })
    }
    else {
        res.send("Not a Admin Login as a Admin")
    }
})
router.delete('/deleteMovie/:id', async (req, res) => {
    const id = req.params.id
    const token = req.headers.authorization.slice(7)
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if (decode.admin) {
        const movie = await movies.deleteOne({ _id: id })
        if (movie.deletedCount === 1) {
            res.send({ message: `Movie Deleted Successfully`, movie })
        }
        else
            res.send('Movie not found')
    }
    else
        res.send("Not a Admin Login as a Admin")
})

module.exports = router