const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const nats = require("./nats");
const routeHandler = require("./route");
const cors = require("cors");

const app = express();

dotenv.config();
app.use(cors({
	origin : "*"
}))
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

mongoose.connect('mongodb://users-mongo-srv:27017/users')

app.listen(4000, () => console.log("listenting at port 4000"));
