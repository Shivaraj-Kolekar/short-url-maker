const express=require('express');// import express
const router = require('./urlrouter');
const app=express();// initialize express
const URL=require('../models/url');//import model


router.get('/',async(req,res)=>{
    const allurls=await URL.find({});
    return res.render("home",{
        urls:allurls,
    });
}) // home page route

router.get('/signup',async(req,res)=>{
    return res.render('signup');
})

router.get('/login', async(req,res)=>{
    return res.render('login');
});
module.exports=router;//export route
