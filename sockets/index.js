let { addUser, deleteUser, onlineAdmin, offlineAdmin } = require("./onlineUsers");
module.exports = (io, socket) => {
    socket.on("newUser", ({ userId }) => {
        addUser(userId, socket.id)
        socket.join(userId);
    });

    socket.on("disconnectUser", ({ userId }) => {
        deleteUser(userId);
        socket.leave(userId);
    });

    socket.on("adminConnect", () => {
        console.log("newAdminConnect")
        onlineAdmin();
        socket.join("admin")
    });

    socket.on("adminDisconnect", () => {
        if (socket.admin)
            socket.join("admin");
        offlineAdmin();
    });
}