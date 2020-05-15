const express = require('express');
const router = express.Router();
const { createItem, ViewItems,updateItem,deleteItem} = require('../Controllers/itemController');

router.route("/item").post(createItem);
router.route("/items").get(ViewItems);
router.route("/items/:id").put(updateItem);
router.route("/items/:id").delete(deleteItem);

module.exports = router;
