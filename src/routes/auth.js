const express = require("express");
const authRouter = express.Router();
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const {validatingSignUpData} = require("../utils/validation");
const jwt = require("jsonwebtoken");

//Putting data to db
authRouter.post("/signUp", async (req,res)=>{
    // console.log(req.body);
    // console.log(req.body.email);
    try{
        validatingSignUpData(req);
        const {firstName,lastName,email,password,photoUrl,gender,about,skills,age} = req.body;
        // const {firstName,lastName,email,password} = req.body;
    
        const passwordHash = await bcrypt.hash(password,10);
        // console.log(passwordHash);
        const user = new User({firstName,lastName,email,password:passwordHash,photoUrl,gender,about,skills,age});
        await user.save();
        res.send("Data is saved to Database!")
    }
    catch(err){
        res.status(400).send("Error : "+err.message);
    }
})

//login--Authentication!
authRouter.post("/login",async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            //create a jwt toke
            const token = jwt.sign({_id : user._id},"Dev@Tinder",{expiresIn:"1d"});
            // console.log(token);
            //Add that token to the cookie to be sent to the user
            res.cookie("token",token);
            res.json({message:"login Successful!",user});
        }
        else{
            throw new Error("Invalid Credentials");
        }
    }catch(err){
        res.status(400).send("Error : "+err.message);
    }
})

//logout
authRouter.post("/logout", async(req,res)=>{
    res.cookie("token",null,{expiresIn: new Date(Date.now())});
    res.send("Logout succesfull");
})

module.exports ={authRouter}