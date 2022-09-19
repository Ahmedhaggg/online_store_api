let categoryService = require("../../services/category.service")
let productService = require("../../services/product.service")

exports.index = async (req, res, next) => {
    let categories = await categoryService.getCategoriesProducts();

    res.status(200).json({
        success: true,
        categories
    });

}

exports.show = async (req, res, next) => {

    let category = await categoryService.getOne({ _id: req.params.id });

    let products = await productService.getAllByCategory({ categoryId: req.params.id });

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