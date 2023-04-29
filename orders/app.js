const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const nats = require("./nats");
const routeHandler = require("./route");
const cors = require('cors');

const app = express();

dotenv.config();

app.use(cors({
  origin : "*"
}))

app.use(express.json());

app.use("/order", routeHandler);

app.use((err,req, res, next) => {
  if(!err.statusCode)
    err.statusCode = 500;
  
  res.status(err.statusCode).json({
    status: "fail",
    message: err.message,
  });
});

mongoose.connect('mongodb://172.16.5.200:27017/users')

app.listen(5000, () => console.log("listenting at port 5000"));
