const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { UPLOADSDEST, PORT, CLIENT } = require("./config")
const app = express();
const guard = require("./sockets/guards");
const { corsOptions } = require("./config/corsOptions")
// cors
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use("/uploads", express.static(UPLOADSDEST))
require("./db/config");

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: [CLIENT],
        methods: ["GET", "POST"]
    }
});

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

app.use("/api/admin/auth", authAdminRoutes);
app.use("/api/admin/categories", categoryAdminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", orderAdminRoutes);
app.use("/api/admin/users", userAdminRoutes);

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


httpServer.listen(PORT || 3000, () => console.log("server is running"));