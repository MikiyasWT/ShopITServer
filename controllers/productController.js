const Product = require("../models/product");

// Get all products   =>   /api/v1/products?keyword=apple
exports.getProducts = async (req, res, next) => {
  const product = await Product.find();
  if (product.status == 400) {
    console.log(error);
  }
  res.status(200).json({
    success: true,
    message: "no products in our stock",
    product,
  });
};

exports.newProduct = async (req, res, next) => {
  console.log(req.body);
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};
