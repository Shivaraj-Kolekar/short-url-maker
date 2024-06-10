const User = require("../models/user");
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
    res.status(200).json({ message: "user created succesfully!" });
    return res.redirect("/");
  } catch (error) {
    return res.status(400).json({ error: "user already exists" });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return res.render("login", {
      error: "invalid email or password",
    });
  }
  try {
    await User.findOne({
      email,
      password,
    });
    
    return res.redirect("/");
  } catch (error) {
    return res.status(400).json({ error: "user already exists" });
  }
}

module.exports = { handleUserSignup, handleUserLogin };
