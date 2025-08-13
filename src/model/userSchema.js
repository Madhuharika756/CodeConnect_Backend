const mongoose = require("mongoose");
const { trim } = require("validator");
const validator =require("validator")

const userSchema = mongoose.Schema({
    "firstName":{
        type:String
    },
    "lastName":{
        type:String
    },
    "email":{
        type :String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    "age":{
        type:Number
    },
    "password":{
        type:String,
        required:true
    },
    "gender":{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is Invalid")
            }
        }
    },
    "about":{
        type:String,
        default:"This is default About"
    },
    "photoUrl":{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfbpEYxFf0qqx_Mi0OVSQ1_zl1j27WwXd_4Q&s",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Ivalid Photo Url: "+value);
            }
        }
    },
    "skills":{
        type:[String]
    }},
    { timestamps: true })

const User = mongoose.model("user",userSchema);

module.exports = User;