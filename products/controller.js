const AppError = require("./utils");
const Product = require("./product_model");
// const nats = require("./nats");
const stan = require("./nats");

exports.welcome = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: null,
    message: "welcome",
  });
};

exports.addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      data: {
        no_of_products: products.length,
        products,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
    });

    if (!product) throw new AppError("product not found", 404);

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!product) throw new AppError("product not found", 404);

    stan.publish("product:updated", JSON.stringify(product), () => {
      console.log("Updated Event");
    });

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
    });

    if(!product)
      throw new AppError('product not found',404);

    stan.publish("product:deleted", JSON.stringify(product), () => {
      console.log("Updated Event");
    });

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};
