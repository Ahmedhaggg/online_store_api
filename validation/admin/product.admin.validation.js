let { check } = require("express-validator");

exports.validate = (action) => {
    switch (action) {
        case "create":
            return [
                check("title").not().isEmpty().withMessage("can't be empty"),
                check("price").not().isEmpty().withMessage("can't be empty")
                    .isInt().withMessage("should be integer"),
                check("categoryId").not().isEmpty().withMessage("can't be empty"),
                check("image").custom((value, { req }) => {
                    if (!req.file.filename)
                        throw new Error("product image is required")
                    return true;
                })

            ];
        default:
            throw new Error("something went wrong");
    }
}