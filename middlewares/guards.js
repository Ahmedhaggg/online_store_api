let jwt = require("../helpers/jwtToken");

exports.isUser = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (!token)
            return res.status(400).json({
                errorName: "authorizedError",
                message: "not authorized"
            });


        let tokenData = await jwt.getDataFromJwtToken(token);
        req.user = { userId: tokenData.userId };
        if (tokenData.role === "user")
            return next();

    } catch (error) {
        return res.status(400).json({
            errorName: "authorizedError",
            message: "not authorized"
        });
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        if (!token)
            return res.status(400).json({
                errorName: "authorizedError",
                message: "not authorized"
            });


        let tokenData = await jwt.getDataFromJwtToken(token);

        if (tokenData.role === "admin")
            return next();

    } catch (error) {
        return res.status(400).json({
            errorName: "authorizedError",
            message: "not authorized"
        });
    }
}
