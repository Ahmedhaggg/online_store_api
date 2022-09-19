const { Product } = require("../../models");

exports.create = async ({ title, categoryId, price, image }) => {
    let newProduct = new Product()
    newProduct.title = title;
    newProduct.category = categoryId;
    newProduct.price = price;
    newProduct.image = image;

    return await newProduct.save();
}

exports.getOne = async (query) => await Product.findOne(query);

exports.getAll = async () => await Product.find().populate("category");

exports.getAllByCategory = async (query) => await Product.find(query).populate("category");

