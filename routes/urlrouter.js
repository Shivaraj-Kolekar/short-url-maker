const express=require('express');
const router=express.Router();// setup the express router
const {handleGenerateNewUrl,handlegetanalytics}=require('../controllers/urlcontroller');// import the controller/function from controller file
const URL=require('../models/url')// import model

router.post('/' , handleGenerateNewUrl );//post function to store the shorten url in db
router.get('/analytics/:shortId',handlegetanalytics );//get function to get the clicks count and id of clicks from db

module.exports=router;