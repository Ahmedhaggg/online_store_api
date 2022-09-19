let router = require("express").Router();
let adminCategoryValidation = require("../../validation/admin/category.admin.validation")
let adminCategoryController = require("../../controllers/admin/category.admin.controller")
let catchErrors = require("../../middlewares/catchErrorMd")
let checkValidationErrors = require("../../middlewares/checkValidationError");
let guards = require("../../middlewares/guards");

router.post("/",
    guards.isAdmin,
    adminCategoryValidation.validate("create"),
    checkValidationErrors,
    catchErrors(adminCategoryController.store)
);

router.get("/",
    guards.isAdmin,
    catchErrors(adminCategoryController.index)
);

router.get("/:id",
    guards.isAdmin,
    catchErrors(adminCategoryController.show)
);

module.exports = router;