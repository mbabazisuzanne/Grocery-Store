const express = require('express');
const router = express.Router();
const {authenticate} = require('../helpers/auth')
const {userValidation} = require('../helpers/validation')
const { SignUp, Login, ViewUsers } = require("../Controllers/usersController");

router.route("/signup").post(userValidation,SignUp);
router.route("/login").post(Login);
router.route("/view").get(authenticate,ViewUsers);

module.exports = router;