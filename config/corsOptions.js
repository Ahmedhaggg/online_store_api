const { CLIENT } = require("./index");

// let allowlist = [];

// let corsOptionsDelegate = function (req, callback) {
//     console.log(req.header('Origin'))
//     if (allowlist.indexOf(req.header('Origin')) !== -1) {
//         callback(null, { origin: req.header('Origin') })
//     } else {
//         console.log("false")
//         callback(new Error({ success: false, message: "page not found" }))

//     }
// }

// const corsOptionsDelegate = {
//     origin: function (origin, callback) {
//         console.log(origin);
//         console.log(allowlist.indexOf(origin))
//         if (allowlist.indexOf(origin) !== -1) {
//             callback(new Error({
//                 success: false,
//                 message: "not allowed"
//             }));
//         } else {
//             callback(null, true)
//         }
//     },
// }

var allowlist = ['http://4000.com']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

exports.corsOptions = corsOptionsDelegate;