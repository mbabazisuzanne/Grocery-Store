const Item = require('../Models/item');


module.exports = {
  createItem: async(req,res)=>{
    try{
      //check if item already exists
      const item = await Item.findOne({title:req.body.title});
      if(item){
        res.status(400).json({message:"Item Already Exits"})
      }else{
        //Add the New Item
        const NewItem = new Item({
          title:req.body.title,
          stock:req.body.stock,
          price:req.body.price,
          category:(req.body.category).toUpperCase()
        });
        const newItemSaved = await NewItem.save()
        console.log("NEW ITEM SAVED:", newItemSaved);
        return res.status(200).json({message:'Successfully added New Item'})
      }

    }catch{
      //Show error that item exists
      return res.status(400).json({Message:"Failed to create Item >>> Something wrong happened"});
    }
  },
  ViewItems: async(req,res)=>{
    try{
      //Check For Items in the DataBase
      const items = await Item.find({});
      return res.status(200).json({ Items: items });
    }catch{
      //Items not Found Error
      return res.status(404).json({ Message: "No items found!" });
    }
  },
  updateItem: async(req,res)=>{
    try{
      //Check for Item and Update it
      const item  = await Item.findOne({_id:req.params.id});
      item.title = req.body.title
      item.stock = req.body.stock
      item.price = req.body.price
      item.category = req.body.category
      item.save()
      return res.status(200).json({Message:`The Item >> ${item.title} << has been Updated`})

    }catch{
      //Item not found
      return res.json({Message:`Item of given ID >> "${req.params.id}" << Was not found`})
    }
  },
  deleteItem: async(req,res)=>{
    try{
      //check for the Item to be deleted
      const item = await Item.findOneAndDelete({_id:req.params.id})
      res.status(200).json({Message:`The item >> ${item.title} << has been Deleted Successfully`})

    }catch{
      //Item Not Found error
      return res.status(404).json({Message:`Item of given ID >> "${req.params.id}" << Was not found`})

    }
  }
}