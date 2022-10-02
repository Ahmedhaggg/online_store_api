let { User, Order } = require("../../models");

exports.getAll = async () => await User.find().select("userName email");

exports.getUser = async (userId) => {
    let user = await User.findOne({ _id: userId });
    if (!user) return null;

    let orders = await Order.find({ user: userId });

    let { _id, userName, email } = user;
    return {
        _id,
        userName,
        email,
        orders
    }
};

exports.count = async () => await User.count();
