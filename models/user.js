const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userName:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    contact:{type:Number}
})  
module.exports = mongoose.model('User',userSchema)