//Import Mongoose Module
const mongoose = require('mongoose');
require('dotenv').config();

//Connecting to MongoDB database
mongoose.connect(process.env.DB_URL_Atlas,{ useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false})
.then(()=>{
    console.log('SUCCESSFULL CONNECTION')
})
.catch((error)=>{
    console.log(`CONNECTION FAILED \n ${error}`)
})

const db = mongoose.connection
module.exports = db;

