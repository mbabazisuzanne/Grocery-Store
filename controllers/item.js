const mongoose = require("mongoose");
const Item = require("../models/item");

const addNewItem = (req, res) => {
  const item = new Item({
    _id: new mongoose.Types.ObjectId(),
    itemName: req.body.itemname,
    price: req.body.price,
    weight: req.body.weight,
    categoryId: req.body.categoryId,
  });

  item
    .save()
    .then(() => {
      res.status(201).json({
        message: "New item has been added.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const getItems = (req, res) => {
  Item.find()
    .exec()
    .then((data) => {
      res.status(200).json({
        message: "Items have been gotten!",
        items: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const deleteItem = (req, res) => {
  const id = req.params.itemId;

  Item.findByIdAndDelete(id)
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Item has been deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const updateItem = (req, res) => {
  const id = req.params.itemId;

  Item.findByIdAndUpdate(id, req.body)
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Item has been updated.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const bringItem = (req, res) => {
  const id = req.params.itemId;
  Item.findById(id)
    .exec()
    .then((data) => {
      res.status(200).json({
        message: "Item has been brought forth!",
        item:data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

module.exports = { addNewItem, getItems, deleteItem, updateItem, bringItem};
