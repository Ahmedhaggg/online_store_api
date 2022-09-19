let userService = require("../../services/admin/user.admin.service");

exports.index = async (req, res, next) => {
    let users = await userService.getAll();

    res.status(200).json({
        success: true,
        users
    });
}

exports.show = async (req, res, next) => {
    let { userId } = req.params;

    let user = await userService.getUser(userId);

    if (!user)
        return res.status(404).json({
            success: false,
            message: "user is not found"
        });

    res.status(200).json({
        success: true,
        user
    })
}
