const mongoose = require('mongoose');//import mongoose
mongoose.set('strictQuery',true);
async function connectToMongoDB(url) {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
        throw error;
    }
}// function to setup mongoose connection


module.exports={
    connectToMongoDB
};//export function