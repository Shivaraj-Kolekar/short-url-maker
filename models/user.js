const mongoose = require('mongoose') //import mongoose

//schema for users
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      default: 'Normal'
    }
  },
  { timestamps: true }
)

//exports
const user = mongoose.model('user', userSchema)
module.exports = user
