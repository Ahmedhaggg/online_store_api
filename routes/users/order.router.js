let router = require("express").Router();
let orderController = require("../../controllers/users/order.controller");
let catchErrors = require("../../middlewares/catchErrorMd");
let guards = require("../../middlewares/guards");

router.get("/",
    guards.isUser,
    catchErrors(orderController.index)
);
router.get("/:id",
    guards.isUser,
    catchErrors(orderController.show)
);
module.exports = router;