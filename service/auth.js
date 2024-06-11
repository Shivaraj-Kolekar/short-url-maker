//const sessionIdToUserMap = new Map()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.secret

function setUser (user) {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role
  }
  return jwt.sign(payload, secret)
}
// Set user for cookies

function getUser (token) {
  if (!token) {
    return null
  }
  try {
    return jwt.verify(token, secret)
  } catch (err) {
    return null
  }
} // get user from cookies

module.exports = {
  setUser,
  getUser
}
