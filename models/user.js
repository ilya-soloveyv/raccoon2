const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: Number,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User