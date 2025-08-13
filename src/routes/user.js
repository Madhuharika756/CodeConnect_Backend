const express = require("express");
const { userAuth } = require("../middleware/auth");
const { ConnectionRequest } = require("../model/connectionRequest");
const User = require("../model/userSchema");
const userRouter = express.Router();

const user_data = "firstName lastName  gender about photoUrl skills age"

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", user_data);
        // const data = connectionRequest.map((row) => row.fromUserId);
        res.json({
            message: "Data is fetched Successfully!",
            data: connectionRequest
        })
    }
    catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ],
        })
            .populate("fromUserId", user_data)
            .populate("toUserId", user_data);

        console.log(connectionRequests);

        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({ data });
    }
    catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})

userRouter.get("/user/feed", userAuth, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 20 ? 20 : limit;
    const skip = (page - 1) * limit;
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");
        const hideuserFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideuserFromFeed.add(req.fromUserId.toString());
            hideuserFromFeed.add(req.toUserId.toString());
        });
        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideuserFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select(user_data).skip(skip).limit(limit);
        res.send(users);
    }
    catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})

module.exports = { userRouter };