const mongoose = require("mongoose");
const { trim } = require("validator");

const userSchema = mongoose.Schema({
    "firstName":{
        type:String
    },
    "lastName":{
        type:String
    },
    "email":{
        type :String,
        unique:true,
        trim:true
    },
    "age":{
        type:Number
    },
    "password":{
        type:String
    }
})

const User = mongoose.model("user",userSchema);

module.exports = User;