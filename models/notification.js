let { Schema, model, Types } = require("mongoose")


let notificationSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

const Notification = model("Notification", notificationSchema);

module.exports = Notification;