const User = require("../Models/userModel");
require("dotenv").config();


module.exports = {
  SignUp: (req, res) => {
    const req_username = req.body.username;
    const req_password = req.body.password;
    const req_firstName = req.body.firstName;
    const req_lastName = req.body.lastName;

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
          firstName: req_firstName,
          lastName: req_lastName
        });
        NewUser.save()
          .then(saved => {
            console.log("NEW USER SAVED: ", saved);
            return res.json({ message: "Sign Up Successfull!"});
          })
          .catch(error => {
            //Show error on console
            console.log("ERROR OCCURED: ", error);
            return res.json({ message: "Sing Up Failed!" });
          });
      }
    });
  },
  Login: (req, res) => {
    const login_username = req.body.username;
    const login_password = req.body.password;

    User.findOne({ username: login_username, password: login_password })
      .then(user => {
        if (user) {
          return res
            .status(200)
            .json({ message: "You've successfully Loged in!"});
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