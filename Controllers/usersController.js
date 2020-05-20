const User = require("../Models/userModel");
const { signToken } = require("../helpers/auth");
const bcrypt = require('bcrypt')
require("dotenv").config();


module.exports = {
  SignUp: async(req,res)=>{
    try{
      //check whether the User already exists before creating one
      const user = await User.findOne({username:req.body.username});
      if(user){
        //respond with user already exists
        res.json({message:"Username Already Taken"})
      }else{
        //create the user
        const NewUser = new User({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          contact: req.body.contact
        });
        //Save the User and provide them with Access token
        const savedUser = await NewUser.save()
        console.log("NEW USER SAVED: ", savedUser);
        const token = signToken(savedUser);
        return res.status(200).json({ message: "Sign Up Successfull!",token:token});
    
      }
    }catch{
      //Throw and Error
      return res.status(400).json({ message: "Sign Up Failed!! Something went Wrong" });
    }
  },
  Login: async(req,res)=>{
    const login_username = req.body.username
    const login_password = req.body.password
    try{
      //check if User already exists
      const user = await User.findOne({username:login_username});
      //compare the loginpassword with stored one
      const result = await bcrypt.compare(login_password,user.password);
      if(result === true){
        const token = signToken(user);
        res.status(200).json({
          message: "You've successfully Loged in!",
          token: token
        });
      }else{
        return res.status(404).json({ error: "Invalid Password!" });
      }

    }catch{
      //throw an error for No Such User existing
      return res.status(500).json({ error: "No such user exists!" });
    }
  },
  ViewUsers: async(req,res)=>{
    try{
      //Find all users
      const users = await User.find({});
      return res.status(200).json({users:users})

    }catch{
      //throw error that shows that there are no Users
      return res.status(404).json({ message: "No users found!" });
    }
  }
  
};