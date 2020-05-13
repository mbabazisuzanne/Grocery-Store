const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemCategorySchema = new Schema(
    {
        title: { type: String, required: true, text: true },
        products: [{ type: Schema.Types.ObjectId, ref: "Item" }]
    },
    { timestamps: true}
);

module.exports = mongoose.model("ItemCategory", itemCategorySchema);