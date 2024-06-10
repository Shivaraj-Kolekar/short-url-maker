const express=require('express');// import express
const app=express();// initialize express
const mongoose=require('mongoose');// import mongoose
const { connectToMongoDB }=require('./connect');// import mongoose connectiion function from connect.js
const URL=require('./models/url')//import url schema model
const PORT = 4000;// define the port 
const path=require('path');

//routes
const urlroute=require('./routes/urlrouter');// import url routes from routes file
const staticRoute=require('./routes/staticRouter');//import static router
const userRoute=require('./routes/userRoute');

let server;

connectToMongoDB('mongodb://localhost:27017/short-url').then(()=>{
    console.log("connected to database");
}).catch(err => {
    console.error("Failed to connect to database", err);
});//the mongoose connection function with error handling

app.set('view engine','ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({extended:false}));
app.use(express.json()); // use for parsing the json body


app.use("/url", urlroute);//implementing all the routes of urlroute file
app.use('/',staticRoute);
app.use('/user',userRoute);

app.get('/url/:id',async (req,res)=>{
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
if (entry) {
    res.redirect(entry.redirectUrl);
} else {
    res.status(404).send('Short ID not found');
}

});//the analytics function which return number of clicks and id of clicks 


server=app.listen(PORT, ()=>{``
    console.log(`server started at port:${PORT}`);
})//start the server
