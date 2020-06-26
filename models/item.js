const mongoose = require("mongoose");
const itemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: Number, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "category",
  },
});

module.exports = mongoose.model("item", itemSchema);
