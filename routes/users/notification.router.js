let router = require("express").Router();
let notificationController = require("../../controllers/users/notification.controller");
let catchErrors = require("../../middlewares/catchErrorMd");
let guards = require("../../middlewares/guards");

router.get("/",
    guards.isUser,
    catchErrors(notificationController.index)
);

router.delete("/",
    guards.isUser,
    catchErrors(notificationController.destroy)
);

module.exports = router; 