const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemCategorySchema = new Schema(
    {
        title: { type: String, required: true, text: true },
        products: {type:Array, 'default':[]}
    },
    { timestamps: true}
);

module.exports = mongoose.model("ItemCategory", itemCategorySchema);