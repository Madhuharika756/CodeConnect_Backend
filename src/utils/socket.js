const socket = require("socket.io");
const intializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
        }
    });
    io.on("connection", (socket) => {
        socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
            const roomId = getSecretRoomId(userId, targetUserId);
            console.log(firstName + " joined Room : " + roomId);
            socket.join(roomId);
        });
            socket.on("sendMessage", () => { });
            socket.on("disConnect", () => { });
        })
    }

module.exports = { intializeSocket };