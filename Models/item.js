const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema(
    {
        title: { type: String, required: true, text: true },
    
        stock: { type: Number, default: 1 },
    
        price: { type: Number, default: 0, required:true },

        category: {type: String, required:true}
    },
    { timestamps: true}//adds createdAt and UpdatedAt fields to the Schema
);
// creating a ITEM model from the itemSchema then exporting it
module.exports = mongoose.model('Item',itemSchema);