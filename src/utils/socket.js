const socketIO = require("socket.io");
const { Chat } = require("../model/chatSchema"); // adjust path if needed

// same room id for both users
const getSecretRoomId = (userId, targetUserId) => {
  return [userId, targetUserId].sort().join("_");
};

const intializeSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    //  JOIN CHAT
    socket.on("joinChat", ({ userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      socket.join(roomId);
      console.log(`${userId} joined room ${roomId}`);
    });

    // SEND MESSAGE (SAVE + EMIT)
    socket.on("sendMessage", async ({ userId, targetUserId, message }) => {
      try {
        const roomId = getSecretRoomId(userId, targetUserId);

        // find or create chat
        let chat = await Chat.findOne({
          participants: { $all: [userId, targetUserId] },
        });

        if (!chat) {
          chat = await Chat.create({
            participants: [userId, targetUserId],
            messages: [],
          });
        }

        chat.messages.push({
          senderId: userId,
          text: message,
        });

        await chat.save();

        // emit to both users
        io.to(roomId).emit("receiveMessage", {
          senderId: userId,
          message,
          createdAt: new Date(),
        });
      } catch (err) {
        console.error("Send message error:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

module.exports = { intializeSocket };
