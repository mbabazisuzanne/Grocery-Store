const express = require('express');
const router = express.Router();
const {itemValidator} = require('../helpers/validation')
const {authenticate} = require('../helpers/auth')
const { createItem, ViewItems,updateItem,deleteItem} = require('../Controllers/itemController');

router.route("/item").post(authenticate,itemValidator,createItem);
router.route("/items").get(authenticate,ViewItems);
router.route("/items/:id").put(authenticate,itemValidator,updateItem);
router.route("/items/:id").delete(authenticate,deleteItem);

module.exports = router;
