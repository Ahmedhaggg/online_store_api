const { dirname } = require("path");
let path = require("path");
let env = require("dotenv");

env.config();

let UPLOADSDEST = path.join(dirname(__dirname), "uploads")

let {
    PORT,
    BCRYPT_SALT,
    JWT_SECRET,
    DB,
    CLIENT
} = process.env;


module.exports = {
    PORT,
    BCRYPT_SALT,
    JWT_SECRET,
    UPLOADSDEST,
    DB,
    CLIENT
};