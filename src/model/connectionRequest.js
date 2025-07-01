const mongoose = require("mongoose");
const User = require("./userSchema");

const connectionRequestSchema = new mongoose.Schema({
    "fromUserId" :{
        type : mongoose.Schema.Types.ObjectId,
        ref:User,
        required : true
    },
    "toUserId" :{
        type : mongoose.Schema.Types.ObjectId,
        required:true,
    },
    "status" :{
        type :String,
        required:true,
        enum: {
           values :["ignored","interested","accepted","rejected"],
           message:"{VALUE} is incorres t status type"
        }
    }
},{timeStamp:true});

//validation 4 can also be written like this
// connectionRequestSchema.pre("save",function(next){
//     const connectionRequest = this;
//     if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
//         throw new Error("Cannot send request to yourSelf!");
//     }
//     next()
// })

const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports ={ConnectionRequest};