let { check } = require("express-validator");

exports.validate = (action) => {
    switch (action) {
        case "create":
            return [
                check("title").not().isEmpty().withMessage("can't be empty")
            ];
        default:
            throw new Error("something went wrong");
    }
}