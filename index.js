const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/items");
const categoryRoutes = require("./routes/categories");

dotenv.config();

const cors = require('cors')
app.use(cors())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected!");
  })
  .catch((err) => {
    console.log("Ooopss!", err);
  });

app.use("/auth", userRoutes);
app.use("/items", itemRoutes);
app.use("/categories", categoryRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
  next();
});

app.get('',(req,res) => {
  res.status(200).json({
    message:'welocme to my site'
  })
});

module.exports = app;
