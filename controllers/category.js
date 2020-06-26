const mongoose = require("mongoose");
const Category = require("../models/category");

const newCategory = (req, res) => {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    categoryName: req.body.categoryname,
  });
  category
    .save()
    .then(() => {
      res.status(201).json({
        message: "New category has been created.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const getCategories = (req, res) => {
  Category.find()
    .exec()
    .then((categoryItems) => {
      res.status(200).json({
        categories: categoryItems,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const deleteCategories = (req, res) => {
  const id = req.params.categoryId;

  Category.findByIdAndDelete(id)
    .exec()
    .then(() => {
      res.status(200).json({
        message: "category has been deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

module.exports = { newCategory, getCategories, deleteCategories };
