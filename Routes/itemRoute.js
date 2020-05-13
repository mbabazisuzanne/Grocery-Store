const express = require('express');
const router = express.Router();
const { item, ViewItems} = require('../Controllers/itemController');

router.route("/item").post(item);
router.route("/items").get(ViewItems);

module.exports = router;
