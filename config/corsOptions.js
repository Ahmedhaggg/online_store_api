const { CLIENT } = require("./index");

let allowlist = [];

let corsOptionsDelegate = function (req, callback) {
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        callback(null, { origin: true })
    } else {
        console.log("false")
        callback(null, { origin: new Error({ success: false, message: "page not found" }) })
    }
}

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (blacklisted.indexOf(origin) !== -1) {
//             callback(new Error({
//                 success: false,
//                 message: "page not found"
//             }))
//         } else {
//             callback(null, true)
//         }
//     },
// }
exports.corsOptions = corsOptionsDelegate;