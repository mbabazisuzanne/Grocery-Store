const router = require('express').Router();
const userController =  require('../controllers/users');

router.post('/signup', userController.signup)

module.exports = router;
