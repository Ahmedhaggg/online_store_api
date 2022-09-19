let productService = require("../../services/product.service")

exports.index = async (req, res, next) => {
    let products = await productService.getAll();

    res.status(200).json({
        success: true,
        products
    });
}

exports.show = async (req, res, next) => {
    let product = await productService.getOne({ _id: req.params.id });

    if (!product)
        return res.status(404).json({
            success: false,
            message: "product is not found"
        });

    res.status(200).json({
        success: true,
        product
    });
}