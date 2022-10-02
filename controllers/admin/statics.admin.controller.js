let productService = require("../../services/admin/product.admin.service");
let categoryService = require("../../services/admin/category.admin.service");
let orderService = require("../../services/admin/order.service");
let userService = require("../../services/admin/user.admin.service");

exports.index = async (req, res, next) => {
    let categoriesLength = await categoryService.count();
    let productsLength = await productService.count();
    let newOrdersLength = await orderService.count("sent");
    let recievedOrdersLength = await categoryService.count("recieved");
    let shippedOrdersLength = await categoryService.count("shipped");
    let completedOrdersLength = await categoryService.count("completed");
    let usersLength = await userService.count();

    res.status(200).json({
        statics: [
            {
                staticName: "categories",
                staticLength: categoriesLength
            },
            {
                staticName: "products",
                staticLength: productsLength
            },
            {
                staticName: "new orders",
                staticLength: newOrdersLength
            },
            {
                staticName: "recieved orders",
                staticLength: recievedOrdersLength
            },
            {
                staticName: "shipped orders",
                staticLength: shippedOrdersLength
            },
            {
                staticName: "completed orders",
                staticLength: completedOrdersLength
            },
            {
                staticName: "users",
                staticLength: usersLength
            }
        ]
    })

}