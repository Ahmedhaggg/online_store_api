const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { UPLOADSDEST, PORT, CLIENT } = require("./config")
const app = express();
const guard = require("./sockets/guards");
const { corsOptions } = require("./config/corsOptions")
// cors
var whitelist = [CLIENT]
app.use(cors())
// app.use(cors({
//     origin: function (origin, callback) {
//         console.log(origin)
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     },
//     credentials: true
// }))


app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use("/uploads", express.static(UPLOADSDEST))
require("./db/config");

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" }})
// const io = new Server(httpServer, {
//     cors: {
//         origin: function (origin, callback) {
//             if (whitelist.indexOf(origin) !== -1) {
//                 callback(null, true)
//             } else {
//                 callback(new Error('Not allowed by CORS'))
//             }
//         },
//         credentials: true
//     }
// });

io.use(guard);

io.on("connection", (socket) => {
    require("./sockets/index")(io, socket);
    require("./sockets/order.socket")(io, socket);
});

// admin routes
let authAdminRoutes = require("./routes/admin/auth.admin.router")
let categoryAdminRoutes = require("./routes/admin/category.admin.router");
let productAdminRoutes = require("./routes/admin/product.admin.router");
let orderAdminRoutes = require("./routes/admin/order.admin.router");
let userAdminRoutes = require("./routes/admin/users.admin.router");
let staticsAdminRoutes = require("./routes/admin/statics.admin.router")
app.use("/api/admin/auth", authAdminRoutes);
app.use("/api/admin/categories", categoryAdminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", orderAdminRoutes);
app.use("/api/admin/users", userAdminRoutes);
app.use("/api/admin/statics", staticsAdminRoutes);


// user routes
let authUserRoutes = require("./routes/users/auth.router");
let productRouters = require("./routes/users/product.router")
let categoryRouters = require("./routes/users/category.router");
let userNotificationRoutes = require("./routes/users/notification.router");
let userOrderRoutes = require("./routes/users/order.router");

app.use("/api/products", productRouters);
app.use("/api/categories", categoryRouters);
app.use("/api/auth", authUserRoutes)
app.use("/api/notifications", userNotificationRoutes);
app.use("/api/orders", userOrderRoutes);

require("./config/index")

app.use((req, res, next) => res.status(404).json({ success: false }))

app.use((error, req, res, next) => {
    res.status(404).json({ message: error.message || "something went wrong", success: false });
})

httpServer.listen(PORT || 3000, () => console.log("server is running"));