let { Order } = require("../../models");

exports.updateOne = async (orderId, status) => {
    let updatedOrder = await Order.updateOne({ _id: orderId }, { status })
    return updatedOrder.modifiedCount === 1 ? true : false;
}

exports.getAll = async () => await Order.find().populate("products.product").populate({
    path: "user",
    select: "userName email"
});

exports.getOne = async (orderId) => await Order.findOne({ _id: orderId }).populate("products.product").populate({
    path: "user",
    select: "userName email"
});

exports.count = async (status) => await Order.count({ status })