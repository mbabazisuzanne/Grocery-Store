const express = require('express');
const router = express.Router();
const { createCategory, categories , updateCategory, deleteCategory, populateCategoryItems,getCategoryById,getCategoryItemById} = require('../Controllers/itemCategoryController');

router.route("/category").post(createCategory);
router.route("/categories").get(categories);
router.route("/categories/:CategoryId").put(updateCategory);
router.route("/categories/:CategoryId").delete(deleteCategory);
router.route("/categories/:CategoryId").get(getCategoryById);
router.route("/categories/:CategoryId/items").get(populateCategoryItems);
router.route("/categories/:CategoryId/items/:ItemId").get(getCategoryItemById);

module.exports = router;
