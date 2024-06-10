const User = require("../models/user");
const {v4:uuidv4}=require('uuid');
const {setUser}=require('../service/auth');

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  try {
    await User.create({
      name,
      email,
      password,
    });
    
    return res.redirect("/");
  } catch (error) {
    return res.status(400).json({ error: "user already exists" });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  
  try {
    const user=await User.findOne({
      email,
      password,
    });
    if (!user) {
      //res.status(400).json({ error: "Username and password are required" });
      return res.render("login", {
        error: "invalid email or password",
      });
    }
    const sessionId=uuidv4();
    res.cookie('uid' , sessionId);
    return res.redirect("/");
    
  } catch (error) {
    return res.status(400).json({ error: "user already exists" });
  }
}

module.exports = { handleUserSignup, handleUserLogin };

