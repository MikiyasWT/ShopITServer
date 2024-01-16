const Product = require("../models/product");

// Get all products   =>   /api/v1/products?keyword=apple
exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  if (products.status == 400) {
    console.log(error);
  }
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

exports.getSingleProduct = async (req, res, next) => {
  const productID = req.params.id;
  if (!productID || productID === undefined) {
    res.status(404).json({
      success: false,
      message: "product id not correct or not provided ",
    });
  }

  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json({
      success: true,
      product,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "product wasn't found ",
    });
  }
};

exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

exports.updateProductById = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (product == null) {
      res.status(404).json({
        success: false,
        message: "Unable to find product with this ID.",
      });
    } else {
      product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the product.",
      error: error.message,
    });
  }
};

exports.deleteProductId = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (product == null) {
      res.status(404).json({
        success: false,
        message: "Unable to find product with this ID.",
      });
    } else {
      let result = await Product.deleteOne({ _id: req.params.id });
      if (result.deletedCount > 0) {
        res.status(204).json({
          success: true,
          message: "Product removed successfully",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while removing the product.",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while removing the product.",
      error: error.message,
    });
  }
};
