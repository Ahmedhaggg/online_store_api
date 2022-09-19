let router = require("express").Router();
let userController = require("../../controllers/admin/user.admin.controller");
let guards = require("../../middlewares/guards")
let catchErrors = require("../../middlewares/catchErrorMd")

router.get("/",
    guards.isAdmin,
    catchErrors(userController.index)
);

router.get("/:userId",
    guards.isAdmin,
    catchErrors(userController.show)
);

module.exports = router;