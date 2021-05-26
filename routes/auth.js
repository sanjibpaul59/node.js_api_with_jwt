const express = require("express");
const router = express.Router();
const User = require("../model/UserModel");
const Joi = require("joi");

//Schema
const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(10).required(),
  password: Joi.string().min(8).required(),
});




router.post("/register",  (req, res) => {
    //Validate data before submission
   const validation =   schema.validate(req.body);
   res.send(validation)

//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   });
//   try {
//     const newUser = await user.save();
//     res.send(newUser);
//   } catch (err) {
//     res.json({ message: err });
//   }
});

// router.post('/login',(req,res)=>{

// })

module.exports = router;
