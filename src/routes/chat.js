const express = require("express");
require("../model/userSchema"); // ✅ MUST BE HERE
const { Chat } = require("../model/chatSchema");
const { userAuth } = require("../middleware/auth");


const chatRouter = express.Router();

/**
 * GET chat between logged-in user & target user
 */
chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { targetUserId } = req.params;

    let chat = await Chat.findOne({
      participants: { $all: [loggedInUserId, targetUserId] },
    }).populate("messages.senderId", "firstName photoUrl");

    if (!chat) {
      chat = await Chat.create({
        participants: [loggedInUserId, targetUserId],
        messages: [],
      });
    }

    res.json(chat.messages);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to load chat");
  }
});

module.exports = { chatRouter };
