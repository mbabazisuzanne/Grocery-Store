const ItemCategory = require('../Models/itemCategory');

module.exports = {
    category:(req,res)=>{
        const NewItemCategory = new ItemCategory({
            title:req.body.title,
            products:[{
                title:req.body.title,
                stock:req.body.stock,
                price:req.body.price
            }]
        });
        NewItemCategory.save()
        .then(saved=>{
            console.log("NEW Item SAVED:", saved);
            return res.json({'message':'Successfully added category'})
        })
        .catch(error=>{
            console.log("ERROR OCCURED:", error);
            return res.json({'message':'Error Unable to add category'})
        });
    }
}