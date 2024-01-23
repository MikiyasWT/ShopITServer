const express = require("express");
const router = express.Router();
const {
  getAdminProducts,
  getProduct,
  getSingleProduct,
  newProduct,
  updateProductById,
  deleteProductId,
} = require("../controllers/productController");

router.route("/admin/product/new").post(newProduct);

router.route("/admin/products").get(getAdminProducts);

router.route("/product").get(getProduct);

router.route("/product/:id").get(getSingleProduct);

router
  .route("/admin/product/:id")
  .patch(updateProductById)
  .delete(deleteProductId);

module.exports = router;
