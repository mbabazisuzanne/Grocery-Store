const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");
const User = require("../models/user");

const schema = joi.object({
  userName:joi.string().alphanum().min(2).max(20).required(),
  password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

})
  .with("userName","password")

const {error,value}=schema.validate({})
console.log("err",error)
console.log("Apology accepted!",value)

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
        const token = jwt.sign(
          {
            userId: Me._Id,
          },
          process.env.SECRET,
          { expiresIn: "1d" }
        );
        if (result) {
          console.log("");
          res.status(200).json({
            message: "Logged in successfully",
            token,
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
