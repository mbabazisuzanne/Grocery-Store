const express = require('express');
const router = express.Router();
const { category } = require('../Controllers/itemCategoryController');

router.route("/category").post(category);

module.exports = router;
