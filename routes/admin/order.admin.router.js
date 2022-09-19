let router = require("express").Router();
let orderController = require("../../controllers/admin/order.admin.controller");
let guards = require("../../middlewares/guards")
let catchErrors = require("../../middlewares/catchErrorMd")

router.get("/",
    guards.isAdmin,
    catchErrors(orderController.index)
);

router.get("/:orderId",
    guards.isAdmin,
    catchErrors(orderController.show)
);

module.exports = router;