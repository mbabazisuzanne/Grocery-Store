const ItemCategory = require('../Models/itemCategory');
const Item = require('../Models/item')


module.exports = {
    createCategory:(req,res)=>{
        ItemCategory.findOne({title:req.body.title}).then(category=>{
            if(category){
                return res.json({message:"Category Already Exits"})
            }else{
                const NewItemCategory = new ItemCategory({
                    title:req.body.title
                });
                NewItemCategory.save()
                .then(saved=>{
                    console.log("NEW category SAVED:", saved);
                    return res.json({'message':'Successfully added category'})
                })
                .catch(error=>{
                    console.log("ERROR OCCURED:", error);
                    return res.json({'message':'Error Unable to add category'})
                })
            }
        }) 
        .catch(error=>{
            console.log("ERROR OCCURED:", error);
        })
        
    },
    categories:(req,res)=>{
        ItemCategory.find({})
          .then(categories => {
            if (categories) {
              return res.json({ categories: categories });
            } else {
              return res
                .json({ message: "No categories found!" });
            }
          })
          .catch(err => {
            return res
              .json({ error: "Error occured while retrieving items list!" });
          });
    },
    updateCategory:(req,res)=>{
        ItemCategory.findOne({_id:req.params.CategoryId}).then(category=>{
            if(category){
                category.title = req.body.title
                category.save()
                return res.json({message:'category updated'})
            }else{
                return res.json('category not found')
            }
        })
        .catch(err => {
            return res
              .json({ error: "Error occured while retrieving items list!" });
          });
    
    },
    deleteCategory:(req,res)=>{
        ItemCategory.findOneAndDelete({_id:req.params.CategoryId}).then(category=>{
            if(category){
                category.save()
                return res.status(200).json({message:`${category.title } category Deleted`})
            }else{
                return res.status(404).json('category not found')
            }
        })
        .catch(err => {
            return res
              .json({ error: "Error occured while retrieving category!" });
          });
    
    },
    populateCategoryItems:(req,res)=>{
        ItemCategory.findOne({_id:req.params.CategoryId},(err,result)=>{
            if(err){return res.status(404).json({message:"Category ID given is NOT FOUND"})}
            else{
            const idCategory = result.title; 
            Item.find({category:idCategory},'stock price title category',(err,result)=>{
                if(err){return err}
                else{
                    const itemsPop = result
                    ItemCategory.findOne({_id:req.params.CategoryId}, 'products',(err,result)=>{
                        if(err){return err}
                        else{
                            result.products.push(...itemsPop)
                            //result.save()
                            res.json({CategoryItems:result})
                        }
                    }) 
                }
            })
            }
        })
    },
    getCategoryById:(req,res)=>{
        ItemCategory.findOne({_id:req.params.CategoryId},(err,result)=>{
            if(err){return res.status(404).json({message:"Category of given ID is NOT FOUND"})}
            else{
            const idCategory = result.title; 
            Item.find({category:idCategory},'stock price title category',(err,result)=>{
                if(err){return err}
                else{
                    const itemsPop = result
                    ItemCategory.findOne({_id:req.params.CategoryId},(err,result)=>{
                        if(err){return err}
                        else{
                            result.products.push(...itemsPop)
                            //result.save()
                            res.json({Category:result})
                        }
                    }) 
                }
            })
            }
        })
    },
    getCategoryItemById:(req,res)=>{
        Item.findOne({_id:req.params.ItemId},(err,result)=>{
            if(err){return res.status(404).json({message:"Item of given Id is Not Available"})}
            else{
                res.json({item:result})
            }
        })
    }

}

