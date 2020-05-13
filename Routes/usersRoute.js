const express = require('express');
const router = express.Router();
const { SignUp, Login, ViewUsers } = require("../Controllers/usersController");

router.route("/signup").post(SignUp);
router.route("/login").post(Login);
router.route("/view").get(ViewUsers);

module.exports = router;