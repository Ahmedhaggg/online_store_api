let categoryService = require("../../services/admin/category.admin.service");
let productService = require("../../services/admin/product.admin.service")
exports.store = async (req, res, next) => {
    let { title } = req.body;

    await categoryService.create({ title });

    res.status(200).json({
        success: true,
        message: "category is created successfully"
    });
}

exports.index = async (req, res, next) => {
    let categories = await categoryService.getAll();

    res.status(200).json({
        success: true,
        categories
    });

}

exports.show = async (req, res, next) => {
    let category = await categoryService.getOne({ _id: req.params.id });

    let products = await productService.getCategoryProducts(req.params.id);
    console.log(products)
    if (!category)
        return res.status(404).json({
            success: false,
            message: "category is not found"
        });

    res.status(200).json({
        success: true,
        category: {
            _id: category._id,
            title: category.title,
            products
        }
    });
}