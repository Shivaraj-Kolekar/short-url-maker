const express = require('express')
const router = express.Router()
const {
  handleUserSignup,
  handleUserLogin
} = require('../controllers/userController')
const user = require('../models/user')
//imports

//routes
router.post('/', handleUserSignup)
router.post('/login', handleUserLogin)

//exports
module.exports = router
