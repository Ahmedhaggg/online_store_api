let { getUserStatus, getAdminStatus } = require("./onlineUsers");
let notificationService = require("../services/notification.service");
let adminOrderService = require("../services/admin/order.service");
let userOrderService = require("../services/order.service");
let userService = require("../services/admin/user.admin.service");

module.exports = (io, socket) => {
    socket.on("createOrder", async ({ userId, orderData }) => {
        try {
            let newOrder = await userOrderService.create(orderData);
            let adminStatus = getAdminStatus();

            if (adminStatus) {
                let user = await userService.getUser(userId);

                io.to("admin").emit("newOrderNotification", {
                    newOrder: {
                        _id: newOrder._id,
                        totalPrice: newOrder.totalPrice,
                        status: newOrder.status,
                        user
                    },

                });
            }

            io.to(userId).emit("createOrderResult", {
                status: true,
                message: "order is created successfully"
            });
        } catch (error) {
            io.to(userId).emit("createOrderResult", {
                status: false,
                message: "something went wrong on create order"
            });
        }
    });

    socket.on("updateOrder", async ({ orderId, userId, status }) => {

        try {

            if (!socket.admin)
                return;

            await adminOrderService.updateOne(orderId, status);

            let user = getUserStatus(userId);

            let newNotification = await notificationService.create({ userId, text: `your order ${orderId} is ${status}` })

            if (user)
                io.to(userId).emit("ordersNotifications", {
                    newNotification,
                    order: {
                        orderId,
                        status
                    }
                });

            io.to("admin").emit("updateOrderResult", {
                status: true,
                message: "order status is updated successfully",
                orderStutus: status
            });
        } catch (error) {
            io.to("admin").emit("updateOrderResult", {
                status: false,
                message: "something went wrong on create order"
            });
        }
    })
}