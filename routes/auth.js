const express = require("express");
const router = express.Router();
const User = require("../model/UserModel");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");

router.post("/register", async (req, res) => {
  //Validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create New User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  //Catch Errors
  try {
    const newUser = await user.save();
    res.send({user: user._id});
  } catch (err) {
    res.json({ message: err });
  }
});

//Login
router.post('/login',async (req,res)=>{
    //Validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    //Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email doesn't exist");
  //Password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send('Invalid Password');


  //Create and assign token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('authenticated-token',token).send(token);

  // res.send('Successfully logged in')



})

module.exports = router;
