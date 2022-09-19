let router = require("express").Router();
let adminAuthController = require("../../controllers/admin/auth.admin.controller");
let adminAuthValidation = require("../../validation/admin/auth.admin.validation");
let catchErrors = require("../../middlewares/catchErrorMd");
const checkValidationError = require("../../middlewares/checkValidationError");

router.post("/login",
    adminAuthValidation.validate("login"),
    checkValidationError,
    catchErrors(adminAuthController.login)
);

router.post("/register",
    catchErrors(adminAuthController.register)
);

module.exports = router;