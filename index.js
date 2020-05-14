const express = require('express');
//import Environment Variables
require('dotenv').config();
//Configuring the Database
require('./config/databaseConfig');
const itemRouter = require('./Routes/itemRoute');
const categoryRouter = require('./Routes/categoryRoute');
const usersRouter = require('./Routes/usersRoute');


//Initializing Express app
const app = express();

app.use(express.json());
app.use("/auth", usersRouter);
app.use("/inventory", categoryRouter);
app.use("/inventory", itemRouter);

app.get('/inventory',(req,res)=>{
    res.json({"Message":"Welcome to the Grocery inventory Management Application"});
})

//Listening on port
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on Port ${port}`);
})

/** Mbabazi changes* */
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const app = express();
// const dotenv =  require('dotenv');
// const userRoutes = require('./routes/users')

//dotenv.config()

// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );

// mongoose
//   .connect(process.env.DB_URL, { useNewUrlParser: true })
//   .then(() => {
//     console.log("Successfully connected!");
//   })
//   .catch((err) => {
//     console.log("Ooopss!", err);
//   });


//Pending Change

// app.use('/auth', userRoutes);

// app.use((req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({ error: { message: error.message } });
//   next();
// });



//module.exports = app;
