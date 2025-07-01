const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const {ConnectionRequest} = require("../model/connectionRequest");
const User = require("../model/userSchema");

//sending coonection request after login
requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        //Validations!!
        //1
        const allowedStatus = ["interested","ignored"];
        if(!allowedStatus.includes(status)){
            return res.status(400).send("Invalid Status type "+status)
        }
        //2
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        });
        if(existingConnectionRequest){
            return res.status(400).send("Connection already exists!")
        }
        //3
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400).send("User not found!");
        }
        //4
        if(fromUserId.equals(toUserId)){
            return res.status(400).send("Cannot send request to yourself!")
        }
        const connectionRequest = new ConnectionRequest({fromUserId,toUserId,status});
        const data = await connectionRequest.save();
        res.json({
            message:"Connection sent Successfull!",
            data
        })
    }
    catch(err){
        res.status(400).send("Error :"+err.message);
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const {status, requestId} = req.params;
        //validation1
        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Status is Invalid!"});
        }
        //2
        const connectionRequest = await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested"
        })
        if(!connectionRequest){
            return res.status(400).send("Connection is not found!");
        }
        connectionRequest.status = status;
        await connectionRequest.save();
        res.send(loggedInUser.firstName+"! "+status+" the request!");
    }
    catch(err){
        res.status(400).send("Error :"+err.message);
    }
})

module.exports ={requestRouter};