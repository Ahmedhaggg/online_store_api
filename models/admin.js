let { Schema, model } = require("mongoose")


let adminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Admin = model("Admin", adminSchema);

module.exports = Admin;