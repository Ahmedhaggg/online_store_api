let { Product } = require("../models");

exports.getOne = async (query) => await Product.findOne(query);

exports.getAll = async () => await Product.find().populate("category");

exports.getAllByCategory = async (query) => await Product.find(query).populate("category");


