let router = require("express").Router();
let authController = require("../../controllers/users/auth.controller")
let authValidation = require("../../validation/users/auth.admin.validation")
let catchErrors = require("../../middlewares/catchErrorMd");
const checkValidationError = require("../../middlewares/checkValidationError");

router.post("/register",
    authValidation.validate("register"),
    checkValidationError,
    catchErrors(authController.register)
);

router.post("/login",
    authValidation.validate("login"),
    checkValidationError,
    catchErrors(authController.login)
);

module.exports = router;