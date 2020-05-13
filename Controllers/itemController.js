const Item = require('../Models/item');

module.exports = {
    item:(req,res)=>{
        const NewItem = new Item({
            title:req.body.title,
            stock:req.body.stock,
            price:req.body.price
        });
        NewItem.save()
        .then(saved=>{
            console.log("NEW Item SAVED:", saved);
            return res.json({'message':'Successfully added'})
        })
        .catch(error=>{
            console.log("ERROR OCCURED:", error);
            return res.json({'message':'Error Unable to add item'})
        });
    },
    ViewItems: (req, res) => {
        Item.find({})
          .then(items => {
            if (items) {
              return res.json({ items: items });
            } else {
              return res
                .json({ message: "No items found!" });
            }
          })
          .catch(err => {
            return res
              .json({ error: "Error occured while retrieving items list!" });
          });
    }
}