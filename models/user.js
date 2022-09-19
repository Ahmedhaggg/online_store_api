let { Schema, model } = require("mongoose")
let { hash } = require("../helpers/hash")

let userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
})

userSchema.pre("save", async function (next) {
    this.password = await hash(this.password);
    next();
});


const User = model("User", userSchema);

module.exports = User;