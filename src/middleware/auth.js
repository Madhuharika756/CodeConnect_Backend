const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const userAuth = async (req,res,next)=>{
    try{
        const cookies = req.cookies;
        const {token} = cookies;
        if(!token){
           return res.status(401).send("Please Login!")
        }
        const decodedMessage = await jwt.verify(token,"Dev@Tinder");
        const {_id} = decodedMessage;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User is not valid");
        }
        req.user = user;
        next();
    }
    catch(err){
        res.status(400).send("ERROR :"+err.message);
    }
}

module.exports= {adminAuth,userAuth};