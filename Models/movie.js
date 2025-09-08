const mongoose = require('mongoose')
const MovieSchema = mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, required: true, ref: 'user' },
    name: { type: String, required: true },
    desc: { type: String },
    isWatched: { type: Boolean, default: false },
    isPartiallyWatched: { type: Boolean, default: false }
})
const movie = mongoose.model('movie', MovieSchema)
module.exports = movie