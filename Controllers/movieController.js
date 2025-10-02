const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
require('../db')
const Movie = require('../Models/movie')

router.post('/addMovie', async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const movie = new Movie({
        user: decode._id,
        name: req.body.name,
        desc: req.body.desc,
        isWatched: req.body.isWatched,
        isPartiallyWatched: req.body.isPartiallyWatched
    })
    await movie.save()
    res.send({ message: 'Movie added successfully', movie })
})
router.get('/viewMoviesList', async (req, res) => {
    const movieList = await Movie.find({}).populate('user')
    res.send(movieList)
})
router.get('/viewUserMovie', async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const userMovie = await Movie.find({ user: decode._id }).populate('user')
    res.send(userMovie)
})
router.get('/viewMovieDetail/:id', async (req, res) => {
    const id = req.params.id
    const token = req.headers.authorization.slice(7)
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const movie = await Movie.findOne ({ _id: id })
    res.send(movie)
})
router.patch('/markAswatched/:id', async (req, res) => {
    const id = req.params.id
    const token = req.headers.authorization.slice(7)
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await Movie.findOne({ _id: id })
    if (decode._id == user.user) {
        const updatedMovie = await Movie.findOneAndUpdate({ _id: id }, { $set: { isWatched: true, isPartiallyWatched: false } });
        res.send({ message: `Updated Successfully as watched ${updatedMovie.name}` })
    }
    else {
        res.send({ message: 'You are not the user to update' })
    }
})
router.patch('/markNotWatched/:id', async (req, res) => {
    const id = req.params.id
    const token = req.headers.authorization.slice(7)
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await Movie.find({ _id: id })
    if (decode._id == user.user) {
        const updatedMovie = await Movie.findOneAndUpdate({ _id: id }, { $set: { isWatched: false, isPartiallyWatched: false } });
        res.send({ message: `Updated Successfully as Not Watched ${updatedMovie.name}` })
    }
    else {
        res.send({ message: 'You are not the user to update' })
    }

})

router.patch('/partiallyWatched/:id', async (req, res) => {
    const id = req.params.id
    const token = req.headers.authorization.slice(7)
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await Movie.findOne({ _id: id })
    if (decode._id == user.user) {
        const updatedMovie = await Movie.findOneAndUpdate({ _id: id }, { $set: { isPartiallyWatched: true } });
        res.send({ message: `Updated Successfully as watched ${updatedMovie.name}` })
    }
    else {
        res.send({ message: 'You are not the user to update' })
    }
})

module.exports = router