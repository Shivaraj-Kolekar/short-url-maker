const mongoose = require('mongoose') //import mongoose
mongoose.set('strictQuery', true)
require('dotenv').config()

async function connectToMongoDB (mongodb_URL) {
  try {
    await mongoose.connect(mongodb_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Could not connect to MongoDB', error)
    throw error
  }
} // function to setup mongoose connection

module.exports = {
  connectToMongoDB
} //export function
