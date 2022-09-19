let { Notification } = require("../models");

exports.create = async (data) => {
    let newNotification = new Notification();
    newNotification.user = data.userId;
    newNotification.text = data.text;
    return await newNotification.save();
}

exports.getOne = async userId => await Notification.findOne({ user: userId });

exports.getAll = async userId => await Notification.find({ user: userId });

exports.deleteUserNotifications = async userId => await Notification.deleteMany({ user: userId });