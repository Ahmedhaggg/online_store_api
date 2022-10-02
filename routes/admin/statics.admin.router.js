let router = require("express").Router();
let adminStaticsController = require("../../controllers/admin/statics.admin.controller")
let catchErrors = require("../../middlewares/catchErrorMd")
let guards = require("../../middlewares/guards");


router.get("/",
    guards.isAdmin,
    catchErrors(adminStaticsController.index)
);


module.exports = router;