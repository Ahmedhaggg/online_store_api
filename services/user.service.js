let { User } = require("../models");

exports.create = async data => {
    let newUser = new User();
    newUser.email = data.email;
    newUser.password = data.password;
    newUser.userName = data.userName;

    return await newUser.save();
}

exports.get = async (email) => await User.findOne({ email });
