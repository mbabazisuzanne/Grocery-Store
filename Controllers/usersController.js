const User = require("../Models/userModel");
const { signToken } = require("../helpers/auth");
const bcrypt = require('bcrypt')
require("dotenv").config();


module.exports = {
  SignUp: (req, res) => {
    const req_username = req.body.username;
    const req_password = req.body.password;
    const req_email = req.body.email;
    const req_contact = req.body.contact;

    //Check whether that user already exists before creating a new document entry in our users collection.
    User.findOne({ username: req_username }).then(user => {
      if (user) {
        //respond with user already exists
        return res.json({ message: "Username already taken!" });
      } else {
        //create the user
        const NewUser = new User({
          username: req_username,
          password: req_password,
          email: req_email,
          contact: req_contact
        });
        NewUser.save()
          .then(saved => {
            console.log("NEW USER SAVED: ", saved);
            const token = signToken(saved);
            return res.status(200).json({ message: "Sign Up Successfull!"});
          })
          .catch(error => {
            //Show error on console
            console.log("ERROR OCCURED: ", error);
            return res.status(400).json({ message: "Sing Up Failed!" });
          });
      }
    });
  },
  Login: (req, res) => {
    const login_username = req.body.username;
    const login_password = req.body.password;

    User.findOne({ username: login_username })
      .then(user => {
        if (user) {
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
              return res.status(404).json({
                error: "Unknown occured while loging you in, please retry!"
              });
            } else {
              if (result === true) {
                const token = signToken(user);
                res.status(200).json({
                  message: "You've successfully Loged in!",
                  token: token
                });
              } else {
                return res
                  .status(404)
                  .json({ error: "Invalid Password!" });
              }
            }
          });
        } else {
          return res.status(500).json({ error: "No such user exists!" });
        }
      })
      .catch(error => {
        return res.status(500).json({ error: "Fatal error occured!" });
      });
  },
  ViewUsers: (req, res) => {
    User.find({})
      .then(users => {
        if (users) {
          return res.status(200).json({ users: users });
        } else {
          return res
            .status(404)
            .json({ message: "No users found!" });
        }
      })
      .catch(err => {
        return res.json({ error: "Error occured while retrieving users list!" });
      });
  }
};