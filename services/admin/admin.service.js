let { Admin } = require("../../models/index");

exports.getAdmin = async (email) => await Admin.findOne({ email });

exports.createAdmin = async (newData) => {
    let newAdmin = new Admin();
    newAdmin.email = newData.email;
    newAdmin.password = newData.password;
    return await newAdmin.save();
}