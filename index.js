const express = require('express');
//import Environment Variables
require('dotenv').config();
//Configuring the Database
require('./config/databaseConfig');
const itemRouter = require('./Routes/itemRoute');
const categoryRouter = require('./Routes/categoryRoute');
const usersRouter = require('./Routes/usersRoute');
//const userRoutes = require('./Routes/users')


//Initializing Express app
const app = express();

app.use(express.json());
app.use("/auth", usersRouter);
//app.use('/auth', userRoutes);
app.use("/inventory", categoryRouter);
app.use("/inventory", itemRouter);

app.get('/inventory',(req,res)=>{
    res.json({"Message":"Welcome to the Grocery inventory Management Application use /inventory/item to add items  and use /iventory/category to add a category"});
})

//Listening on port
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on Port ${port}`);
})
