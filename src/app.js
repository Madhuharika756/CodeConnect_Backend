// console.log("Hello from console!!")

const express = require('express');

const {connectDb} = require("./config/database");

const User = require("./model/userSchema");

const app = express();

const adminAuth = require("./middleware/auth");

app.use("/admin",adminAuth);

app.get("/admin",(req,res)=>{
    res.send("Authorized!");
})

app.get("/admin/getUser",(req,res)=>{
    res.send("Fetched the user succesfuuly");
});

app.delete("/admin/deleteUser",(req,res)=>{
    res.send("Deleted user successfully!");
})

// app.listen(1399,()=>{
//     console.log("App is listening at port number 1399");
// })

//middleware have to be used to read josn and to conver it in to js object
app.use(express.json());

//Putting data to db
app.post("/signUp", async (req,res)=>{
    // const userInfo = {
    //     firstName :"Surekha",
    //     lastName :"Rangam",
    //     email :"surekha@gmail.com",
    //     age:22
    // }
    console.log(req.body);

    console.log(req.body.email);

    const user = new User(req.body);
    try{
        await user.save();
        res.send("Data is saved to Database!")
    }
    catch(err){
        res.status(400).send("Something went wrong"+err.message);
    }
})


//Getting data
app.get("/user", async (req,res)=>{
    const emailId = req.body.email;
    try{

        //fethcing one user
        const user = await User.find({email:emailId});
        res.send(user);

        //fetching all users
        // const user = await User.find({});
        // res.send(user);
    }
    catch(err){
        res.status(400).send("Something went wrong!");
    }
})

//Deleting data

app.delete("/deleteUser", async(req,res)=>{
    const userId = req.body._id;
    try{
        const deleteUserInfo = await User.findByIdAndDelete(userId);
        res.send("Deleted User Successfully!");
    }
    catch(err){
        res.status(404).send("Something went wrong!");
    }
})


//Updating the User

app.patch("/updateUser", async(req,res)=>{
    const userId = req.body._id;
    const data = req.body

    try{
        const user = await User.findByIdAndUpdate({_id:userId},data);
        res.send(user);
    }
    catch(err){
        res.status(400).send("Sometthing went wrong");
    }
})


connectDb().then(()=>{
    console.log("Database is connected successfully");
    
app.listen(1399,()=>{
    console.log("App is listening at port number 1399");
});
}).
catch((err)=>{
    console.log("Database is not connected");
});