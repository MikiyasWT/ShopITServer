
// Get all products   =>   /api/v1/products?keyword=apple
exports.getProducts = async (req, res, next) => {

    res.status(200).json({
        success: true,
        message:"no products in our stock"
    })

}