const mongoose = require("mongoose");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
// Get all products   =>   /api/v1/products?keyword=apple
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (products.status == 400 || products === null) {
      return next(new ErrorHandler("No product was found", 400));
    } else {
      res.status(200).json({
        success: true,
        count: products.length,
        products,
      });
    }
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
};

exports.getSingleProduct = async (req, res, next) => {
  const _id = req.params.id;
  const isValidId = mongoose.Types.ObjectId.isValid(_id);
  if (!isValidId) {
    return next(new ErrorHandler("Incorrect Object Id", 404));
  }
  try {
    const product = await Product.findById(req.params.id);

    if (product === null) {
      return next(new ErrorHandler("No product was found", 404));
    } else {
      res.status(200).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    return next(new ErrorHandler("Server Error", 500));
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
