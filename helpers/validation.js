const Joi = require('joi');


module.exports = {
    userValidation:(req,res,next)=>{
        const Schema = {
            username: Joi.string().min(4).max(20).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            email: Joi.string().regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/).required(),
            contact: Joi.string().regex(/^[0-9]{8,10}$/).required()  
        }
        const result  = Joi.validate(req.body,Schema);// validate the request body against the Schema
        if(result.error){
            //throw error
            res.status(400).json(result.error.details[0].message);
        }else{
            next();
        }
    },
    itemValidator:(req,res,next)=>{
        const Schema = {
            title:Joi.string().min(3).required().regex(/^[a-zA-Z._-]/),
            stock:Joi.number(),
            price:Joi.number(),
            category:Joi.string().min(3).max(10)
        }
        const result = Joi.validate(req.body,Schema);
        if(result.error){
            res.status(400).json(result.error.details[0].message);
        }else{
            next()
        }
    },
    categoryValidation:(req,res,next)=>{
        const Schema = {
            title:Joi.string().min(3)
        }
        const result = Joi.validate(req.body,Schema);
        if(result.error){
            res.status(400).json(result.error.details[0].message);
        }else{
            next();
        }
    }
}