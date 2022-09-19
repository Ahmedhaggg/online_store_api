let { Category } = require("../models");

exports.getOne = async (query) => await Category.findOne(query);

exports.getAll = async (query) => await Category.find(query);

exports.getCategoriesProducts = async () => Category
    .find()
    .populate("products")