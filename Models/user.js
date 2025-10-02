const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true},
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phNo: { type: String, required: true },
  proImg: { type: String }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;