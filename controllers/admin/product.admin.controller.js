let productService = require("../../services/admin/product.admin.service");
let categoryService = require("../../services/admin/category.admin.service")
exports.store = async (req, res, next) => {
    let image = req.file.filename;

    let { title, categoryId, price } = req.body;

    let newProduct = await productService.create({ title, categoryId, image, price });
    await categoryService.addNewProduct(categoryId, newProduct._id)

    res.status(200).json({
        success: true,
        message: "product is created successfully"
    })
}

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