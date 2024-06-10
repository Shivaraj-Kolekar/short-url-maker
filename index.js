const express=require('express');// import express
const app=express();// initialize express
const mongoose=require('mongoose');// import mongoose
const { connectToMongoDB }=require('./connect');// import mongoose connectiion function from connect.js
const urlroute=require('./routes/urlrouter');// import url routes from routes file
const URL=require('./models/url')//import url schema model
const PORT = 8081;// define the port 

connectToMongoDB('mongodb://localhost:27017/short-url').then(()=>{
    console.log("connected to database");
}).catch(err => {
    console.error("Failed to connect to database", err);
});//the mongoose connection function with error handling

app.use(express.json()); // use for parsing the json body
app.use("/url", urlroute);//implementing all the routes of urlroute file

app.get('/',(req,res)=>{
    res.status(200).send("Welcome to URL shortner website");
});//the basic index page of website

app.get('/:id',async (req,res)=>{
    const shortId=req.params.id;
    const entry=await URL.findOneAndUpdate(
    {
        shortID: shortId
    },
    {$push: {
        visitHistory:{
        timestamp: Date.now(),
        },
    },
    }
);
    res.redirect(entry.redirectUrl);
});//the analytics function which return number of clicks and id of clicks 


app.listen(PORT, ()=>{``
    console.log(`server started at port:${PORT}`);
})//start the server