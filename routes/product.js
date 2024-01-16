const express = require("express");
const router = express.Router();
const {
  getProducts,
  getSingleProduct,
  newProduct,
  updateProductById,
  deleteProductId,
} = require("../controllers/productController");

router.route("/products").get(getProducts);

router.route("/admin/product/new").post(newProduct);

router.route("/product/:id").get(getSingleProduct);

router
  .route("/admin/product/:id")
  .patch(updateProductById)
  .delete(deleteProductId);

module.exports = router;
