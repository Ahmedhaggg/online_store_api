let notificationService = require("../../services/notification.service");


exports.index = async (req, res, next) => {
    let { userId } = req.user;
    let notifications = await notificationService.getAll(userId);

    res.status(200).json({
        success: true,
        notifications
    });
}

exports.destroy = async (req, res, next) => {
    let { userId } = req.user;
    await notificationService.deleteUserNotifications(userId);

    res.status(200).json({
        success: true,
        message: "all user notifications is deleted"
    });
}