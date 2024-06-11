const express = require('express') // import express
const router = require('./urlrouter')
const app = express() // initialize express
const URL = require('../models/url') //import model

router.get('/', async (req, res) => {
  if (!req.user) {
    return res.redirect('/login')
  }
  const allurls = await URL.find({ createdby: req.user._id })
  return res.render('home', {
    urls: allurls
  })
}) // home page route

router.get('/signup', async (req, res) => {
  return res.render('signup')
}) // signup page route

router.get('/login', async (req, res) => {
  return res.render('login')
}) // login page route

module.exports = router //export route
