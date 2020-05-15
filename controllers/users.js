const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../Models/user");

const signup = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
      return err;
    }

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      userName: req.body.username,
      email: req.body.email,
      password: hash,
      contact:req.body.contact
    });

    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "User has been added",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
};

const login = (req, res) => {
  const userEmail = req.body.email;
  const password = req.body.password;

  User.findOne({
    email: userEmail,
  })
    .exec()
    .then((Me) => {
      bcrypt.compare(password, Me.password, (err, result) => {
        if (result) {
          res.status(200).json({
            message: "Logged in successfully",
          });
        } else {
          res.status(401).json({
            message: "Unauthorized",
          });
        }
      });
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

module.exports = { signup, login };
