const express = require('express') // import express
const app = express() // initialize express
const mongoose = require('mongoose') // import mongoose
const { connectToMongoDB } = require('./connect') // import mongoose connectiion function from connect.js
const URL = require('./models/url') //import url schema model
const cookieParser = require('cookie-parser')
const {
  restrictToLoggedInUserOnly,
  checkAuth
} = require('./middleware/authmiddleware')
const PORT = process.env.PORT // define the port
const mongodb_URL = process.env.MONGO_URL
const path = require('path')
require('dotenv').config()

//uel routes imports
const urlroute = require('./routes/urlrouter') // import url routes from routes file
const staticRoute = require('./routes/staticRouter') //import static router
const userRoute = require('./routes/userRoute')

//mongo db connection
connectToMongoDB(mongodb_URL)
  .then(() => {
    console.log('connected to database')
  })
  .catch(err => {
    console.error('Failed to connect to database', err)
  }) //the mongoose connection function with error handling

//ejs setup
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) // use for parsing the json body
app.use(cookieParser())

//endpoints
app.use('/url', restrictToLoggedInUserOnly, urlroute) //implementing all the routes of urlroute file
app.use('/', checkAuth, staticRoute)
app.use('/user', userRoute)

app.get('/url/:id', async (req, res) => {
  const shortId = req.params.id
  const entry = await URL.findOneAndUpdate(
    {
      shortID: shortId
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now()
        }
      }
    }
  )
  if (entry) {
    res.redirect(entry.redirectUrl)
  } else {
    res.status(404).send('Short ID not found')
  }
}) //the analytics function which return number of clicks and id of clicks

//Server initialization
let server = app.listen(PORT, () => {
  ;``
  console.log(`server started at port:${PORT}`)
}) //start the server
