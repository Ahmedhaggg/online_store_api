let { Order } = require("../models");

exports.create = async (data) => {
    let newOrder = new Order();
    newOrder.user = data.userId;
    newOrder.products = data.products.map(product => ({ product: product._id, price: product.price, quantity: product.quantity }));
    newOrder.totalPrice = data.totalPrice;
    return await newOrder.save()
}

exports.getAllUserOrders = async (userId) => await Order.find({ user: userId }).populate("products.product");

exports.getUserOrder = async (userId, orderId) => await Order.findOne({ user: userId, _id: orderId }).populate("products.product");