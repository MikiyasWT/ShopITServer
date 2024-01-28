const mongoose = require("mongoose");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const product = require("../models/product");

// Create new product   =>   /api/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  return res.status(201).json({
    success: true,
    product,
  });
});

// Get all products   =>   /api/products?keyword=apple
exports.getProduct = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .filter()
    .search()
    .pagination(resPerPage);

  let products = await apiFeatures.query;

  let filteredProductsCount = products.length;

  res.status(200).json({
    success: true,
    productsCount,
    resPerPage,
    filteredProductsCount,
    products,
  });
});
// Get all products (Admin)  =>   /api/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
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
});

//get a single product by ID api/product/:id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
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
});

// Update Product   =>   /api/admin/product/:id
exports.updateProductById = catchAsyncErrors(async (req, res, next) => {
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
});

// Delete Product   =>   /api/admin/product/:id
exports.deleteProductId = catchAsyncErrors(async (req, res, next) => {
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
});
