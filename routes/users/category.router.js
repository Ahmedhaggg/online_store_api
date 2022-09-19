let router = require("express").Router();
let categoryController = require("../../controllers/users/category.controller")
let catchErrors = require("../../middlewares/catchErrorMd")

router.get("/", catchErrors(categoryController.index));

router.get("/:id", catchErrors(categoryController.show));


module.exports = router;