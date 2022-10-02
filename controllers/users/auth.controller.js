let { compare } = require("../../helpers/hash")
let jwt = require("../../helpers/jwtToken");
let userService = require("../../services/user.service");
exports.register = async (req, res, next) => {
    let { email, password, userName } = req.body;


    await userService.create({
        userName,
        email,
        password,
    });

    res.status(200).json({
        success: true,
        message: "success register"
    });
}

exports.login = async (req, res, next) => {
    let { email, password } = req.body;

    let user = await userService.get(email);

    if (!user)
        res.status(404).json({
            success: false,
            errorName: "loginError",
            message: "email is not used"
        });

    let checkPassword = await compare(password, user.password);

    if (checkPassword === false)
        res.status(404).json({
            success: false,
            errorName: "loginError",
            message: "correct password"
        });


    let token = await jwt.createJwtToken({
        userId: user._id,
        role: "user"
    }, "30d");

    res.status(200).json({
        success: true,
        token,
        userId: user._id,
        message: "success login"
    });
}
