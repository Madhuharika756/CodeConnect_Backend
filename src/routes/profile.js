const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const {ValidatingEditProfileData,validatePasswordToEdit} = require("../utils/validation");
const bcrypt = require("bcrypt");

//Getting profile after login
profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
})

//Updating profile
profileRouter.patch("/updateProfile", userAuth, async(req,res)=>{
    try{
        if(!ValidatingEditProfileData(req)){
            throw new Error("Invalid to Edit");
        }
        const loggedInUser = req.user;;
        Object.keys(req.body).forEach(key=>{loggedInUser[key]=req.body[key]});
        console.log(loggedInUser);
        await loggedInUser.save();
        res.send(loggedInUser.firstName+"! your profile Upadted Successfully")
    }
    catch(err){
        res.status(400).send("Error: "+err.message);
    }
})

//Updating Password
profileRouter.patch("/forgotPassword", userAuth, async(req,res)=>{
    try{
        // const {password} = user.body;
        validatePasswordToEdit(req);
        const newPassword = req.body.password;
        req.user.password= await bcrypt.hash(newPassword,10);
        // previousPassword.save();
        await req.user.save();
        console.log(req.user.password);
        res.send(req.user.firstName+" you've succesfully updated your password!");
    }
    catch(err){
        res.status(400).send("Error :"+err.message);
    }
})

module.exports = {profileRouter};