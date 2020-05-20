const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemCategorySchema = new Schema(
    {
        title: { type: String, required: true, text: true },
        products: {type:Array, 'default':[]},
        url:{type:String}
    },
    { timestamps: true}
);
//Virtual for category URL
// itemCategorySchema
// .virtual('url')
// .get(()=>{
//   return '/inventory/categories/'+ this._id;
// })

module.exports = mongoose.model("ItemCategory", itemCategorySchema);