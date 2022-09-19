let { getDataFromJwtToken } = require("../../helpers/jwtToken");

module.exports = async (socket, next) => {
    let token = socket.handshake.auth.token;

    try {
        let data = await getDataFromJwtToken(token);

        if (data.role === "user")
            socket.userId = data.userId;
        else
            socket.admin = true;

        next();
    } catch (error) {
        next(new Error({
            success: false,
            message: "not authenticated"
        }))
    }
}