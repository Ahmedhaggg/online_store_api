let onlineUsers = [];
let adminIsOnline = false;

module.exports = {

    addUser: (userId, socketId) => {
        let user = onlineUsers.find(onlineUser => onlineUser.userId === userId);

        if (!user)
            onlineUsers.push({ socketId, userId });

    },
    deleteUser: (userId) => {
        onlineUsers = onlineUsers.filter(user => user.userId !== userId)
    },
    getUserStatus: (userId) => onlineUsers.find(user => user.userId === userId),
    onlineAdmin: () => {
        adminIsOnline = true
    },
    offlineAdmin: () => {
        adminIsOnline = false;
    },
    getAdminStatus: () => adminIsOnline
}