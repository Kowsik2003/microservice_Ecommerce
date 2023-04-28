const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const stan = require("./nats");
const routeHandler = require("./route");
const cors = require("cors")
const app = express();

dotenv.config();

app.use(express.json());

app.use(cors({
  origin: "*"
}))
app.use("/product", routeHandler);

app.use((err,req, res, next) => {

  if(!err.statusCode)
{
	err.statusCode = 500;
}
  res.status(err.statusCode).json({
    status: "fail",
    message: err.message,
  });
});

mongoose
  .connect("mongodb://products-mongo-srv:27017/products");

app.listen(3000, () => console.log("listenting at port 3000"));
