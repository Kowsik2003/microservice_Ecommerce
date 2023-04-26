const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const nats = require("./nats");
const routeHandler = require("./route");

const app = express();

dotenv.config();

app.use(express.json());

app.use("/user", routeHandler);

app.use((err,req, res, next) => {
  if(!err.statusCode)
    err.statusCode = 500;
  
  res.status(err.statusCode).json({
    status: "fail",
    message: err.message,
  });
});

// mongoose.connect(process.env.DATABASE , () => console.log('connected to db'))

app.listen(4000, () => console.log("listenting at port 3000"));
