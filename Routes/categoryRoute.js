const express = require('express');
const router = express.Router();
const {categoryValidation} = require('../helpers/validation')
const {authenticate} = require('../helpers/auth')
const { createCategory, categories , updateCategory, deleteCategory, populateCategoryItems,getCategoryById,getCategoryItemById} = require('../Controllers/itemCategoryController');

router.route("/category").post(authenticate,categoryValidation,createCategory);
router.route("/categories").get(authenticate,categories);
router.route("/categories/:CategoryId").put(authenticate,categoryValidation,updateCategory);
router.route("/categories/:CategoryId").delete(authenticate,deleteCategory);
router.route("/categories/:CategoryId").get(authenticate,getCategoryById);
router.route("/categories/:CategoryId/items").get(authenticate,populateCategoryItems);
router.route("/categories/:CategoryId/items/:ItemId").get(authenticate,getCategoryItemById);

module.exports = router;
