
const express = require('express');
const {connectDb} = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

//middleware have to be used to read josn and to conver it in to js object
app.use(express.json());

//middleware to prevent the cors error

//middleware have to be used to read cookies
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}));

const {authRouter} = require("./routes/auth");
const {profileRouter} = require("./routes/profile");
const {requestRouter} = require("./routes/requests");
const { userRouter } = require('./routes/user');

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


// //Getting data
// app.get("/user", async (req,res)=>{
//     const emailId = req.body.email;
//     try{
//         //fethcing one user
//         const user = await User.find({email:emailId});
//         res.send(user);
//         //fetching all users
//         // const user = await User.find({});
//         // res.send(user);
//     }
//     catch(err){
//         res.status(400).send("Something went wrong!");
//     }
// })

// //Deleting data
// app.delete("/deleteUser", async(req,res)=>{
//     const userId = req.body._id;
//     try{
//         const deleteUserInfo = await User.findByIdAndDelete(userId);
//         res.send("Deleted User Successfully!"+deleteUserInfo);
//     }
//     catch(err){
//         res.status(404).send("Something went wrong!");
//     }
// })

// //Updating the User
// app.patch("/updateUser", async(req,res)=>{
//     const userId = req.body._id;
//     const data = req.body
//     try{
//         const user = await User.findByIdAndUpdate({_id:userId},data);
//         res.send(user);
//     }
//     catch(err){
//         res.status(400).send("Sometthing went wrong");
//     }
// })

connectDb().then(()=>{
    console.log("Database is connected successfully");
    
app.listen(1399,()=>{
    console.log("App is listening at port number 1399");
});
}).
catch((err)=>{
    console.log("Database is not connected");
});