const shortid=require('shortid');//import shortid package
const URL=require('../models/url');//import model

async function handleGenerateNewUrl(req,res){
    const body= req.body;
    console.log("Request Body:", body); 
    if(!body.url){
        return res.status(400).json({error:"the url is required!"})
    }
    const shortID=shortid.generate();
    console.log("Generated Short ID:", shortID); 
    try {
        const newURL = await URL.create({
            shortID: shortID,
            redirectUrl: body.url,
            visitHistory: []
        });console.log("Created URL Document:", newURL);
        return res.render('home',{
            id:shortID,
        });
        //return res.json({ id: shortID });
    } catch (error) {
        console.error("Error creating URL document:", error); // Log error details
        return res.status(500).json({ error: "Error creating URL document" });
    }
}//the function to post the data to database in shorten form

async function handlegetanalytics(req,res){
 try{const shortId=req.params.shortId;
 const result=await URL.findOne({shortId});
 return res.json({totalClicks:result.visitHistory.length, analytics:result.visitHistory}); 
 if(result==null){
    return console.log('empty resutl');
 }
 console.log(result);
 }catch(err){
    console.error("Error in finding URL document:", error); // Log error details
    return res.status(500).json({ error: "Error finding URL document" });
 }
};// the function to get the data of click and id of url from database

module.exports={handleGenerateNewUrl,handlegetanalytics};//export the functions