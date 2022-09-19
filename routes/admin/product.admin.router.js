let router = require("express").Router();
let adminProductValidation = require("../../validation/admin/product.admin.validation")
let adminProductController = require("../../controllers/admin/product.admin.controller")
let catchErrors = require("../../middlewares/catchErrorMd")
let checkValidationErrors = require("../../middlewares/checkValidationError");
const uploader = require("../../middlewares/uploader");
let guards = require("../../middlewares/guards");

router.post("/",
    uploader.uploadFile("image"),
    guards.isAdmin,
    adminProductValidation.validate("create"),
    checkValidationErrors,
    catchErrors(adminProductController.store)
);

router.get("/",
    guards.isAdmin,
    catchErrors(adminProductController.index)
);

router.get("/:id",
    guards.isAdmin,
    adminProductController.show
);

module.exports = router;