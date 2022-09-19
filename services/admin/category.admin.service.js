const { Category } = require("../../models");

exports.create = async ({ title }) => {
    let newCategory = new Category()
    newCategory.title = title;

    await newCategory.save();
}

exports.getOne = async (query) => await Category.findOne(query);

exports.getAll = async (query) => await Category.find(query);
exports.addNewProduct = async (categoryId, newProductId) => await Category
    .updateOne({ _id: categoryId }, { $push: { products: newProductId } });
