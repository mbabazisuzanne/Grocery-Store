const ItemCategory = require('../Models/itemCategory');
const Item = require('../Models/item')


module.exports = {
    createCategory: async(req,res)=>{
        try{
            //Check if item already Exists
            const category = await ItemCategory.findOne({title:req.body.title});
            if(category){
                //category already exists
                return res.status(400).json({Message:"Category Already Exits"});
            }else{
                //add category
                const NewItemCategory = new ItemCategory({
                    title:(req.body.title).toUpperCase()
                });
                NewItemCategory.url = '/inventory/categories/'+ NewItemCategory._id
                //save  new category
                const savedCategory = await NewItemCategory.save()
                console.log("NEW category SAVED:", savedCategory);
                return res.json({Message:`Successfully added >> ${req.body.title} << category`})

            }

        }catch{
            //return Error
            return res.json({Message:'Error!!! >> Unable to add this Category'})
        } 
    },
    categories: async(req,res)=>{
        try{
            //check for categories then Display them
            const categories = await ItemCategory.find({});
            res.status(200).json({Catogries:categories});

        }catch{
            //return an error 
            return res.status(404).json({Message:"No Categories Found"});
        }
    },
    updateCategory: async(req,res)=>{
        try{
            //check for category
            const category = await ItemCategory.findOne({_id:req.params.CategoryId});
            category.title = req.body.title
            category.save()
            return res.status(200).json({message:`>> ${category.title} << category has been updated`});
        }catch{
            //category not found
            return res.status(404).json({Message:`Category of given ID >> "${req.params.CategoryId}" << not found`});

        }
    
    },
    deleteCategory: async (req,res)=>{
        try{
            //check DataBase for category
            const result = await ItemCategory.findOneAndDelete({_id:req.params.CategoryId})
            return res.status(200).json({message:`${result.title } category Deleted`})
        }catch{ 
            //category found error
            return res.status(404).json({Message:`Category of given ID >> "${req.params.CategoryId}" << not found`});
        }
        
    },
    populateCategoryItems: async(req,res)=>{
        try{
            const result = await ItemCategory.findOne({_id:req.params.CategoryId});
            const idCategory = result.title;
            const result2  = await Item.find({category:idCategory},'stock price title category')
            const itemsPop = result2
            result.products.push(...itemsPop)
            res.json({CategoryItems:result.products})
        }catch(err){
            res.status(404).json({message:"Category of given ID is NOT FOUND"})
        }
    },
    getCategoryById: async (req,res)=>{
        try{
            const result = await ItemCategory.findOne({_id:req.params.CategoryId});
            const idCategory = result.title;
            const result2  = await Item.find({category:idCategory},'stock price title category')
            const itemsPop = result2
            result.products.push(...itemsPop)
            res.json({Category:result})
        }catch(err){
            res.status(404).json({message:"Category of given ID is NOT FOUND"})
        }
        
    },
    getCategoryItemById: async (req,res)=>{
        try{
         const result = await Item.findOne({_id:req.params.ItemId});
         res.json({item:result})
        }catch(err){
            res.status(404).json({message:"Item of given ID is Not Available"})
        }
    }

}

