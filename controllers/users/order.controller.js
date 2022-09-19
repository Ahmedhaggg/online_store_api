let orderService = require("../../services/order.service");

exports.index = async (req, res, next) => {
    let { userId } = req.user;

    let orders = await orderService.getAllUserOrders(userId);

    res.status(200).json({
        success: true,
        orders
    });
}

exports.show = async (req, res, next) => {
    let { userId } = req.user;
    let { id } = req.params;

    let order = await orderService.getUserOrder(userId, id);

    if (!order)
        return res.status(404).json({
            success: false,
            message: "order is not found"
        });

    res.status(200).json({
        success: true,
        order
    });
}