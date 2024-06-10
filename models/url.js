const mongoose=require('mongoose');

//defined the schema model for the url database 
const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitHistory: [{
        timestamp: {
            type: Number
        }
    }]
}, { timestamps: true });

const URL = mongoose.model("URL", urlSchema);// storing the model in variable
module.exports = URL;// exporting the model