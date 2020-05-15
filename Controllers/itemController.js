const Item = require('../Models/item');


module.exports = {
    createItem:(req,res)=>{

      Item.findOne({title:req.body.title}).then((item)=>{
        if(item){
          console.log(item)
          return res.json({message:"Item Already Exits"})
        }
        else{
          const NewItem = new Item({
            title:req.body.title,
            stock:req.body.stock,
            price:req.body.price,
            category:req.body.category
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
        }
      })
      .catch(error=>{
        console.log("ERROR OCCURED:", error);
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
    },
    updateItem:(req,res)=>{
      Item.findOneAndUpdate({_id:req.params.id}).then(item=>{
          if(item){
              item.title = req.body.title
              item.stock = req.body.stock
              item.price = req.body.price
              item.category = req.body.category
              

              item.save()
              return res.json({message:'Item updated'})
          }else{
              return res.json('Item not found')
          }
      })
      .catch(err => {
          return res
            .json({ error: "Error occured while retrieving item!" });
      });
  
  },
  deleteItem:(req,res)=>{
      Item.findOneAndDelete({_id:req.params.id}).then(item=>{
          if(item){
              item.save()
              return res.json({message:'Item Deleted'})
          }else{
              return res.json('Item not found')
          }
      })
      .catch(err => {
          return res
            .json({ error: "Error occured while retrieving Item!" });
      });
  
  }
}