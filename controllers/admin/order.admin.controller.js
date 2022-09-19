let orderService = require("../../services/admin/order.service");

exports.index = async (req, res, next) => {
    let orders = await orderService.getAll();

    res.status(200).json({
        success: true,
        orders
    });
}

exports.show = async (req, res, next) => {
    let { orderId } = req.params;

    let order = await orderService.getOne(orderId)

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