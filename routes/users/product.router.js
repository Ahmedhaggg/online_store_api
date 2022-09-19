let router = require("express").Router();
let productController = require("../../controllers/users/product.controller")
let catchErrors = require("../../middlewares/catchErrorMd")

router.get("/", catchErrors(productController.index));

router.get("/:id", catchErrors(productController.show));

module.exports = router;