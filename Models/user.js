const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phNo: { type: Number, required: true },
    proImg: { type: String }
})
const user = mongoose.model('user', UserSchema)
module.exports = user