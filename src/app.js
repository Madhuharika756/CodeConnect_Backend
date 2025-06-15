// console.log("Hello from console!!")

const express = require('express');

const app = express();

//handling different request differently

app.use("/test",(req,res)=>{
    res.send("Hello!! from different request /test")
})

app.use("/hello",(req,res)=>
{
    res.send("Hello from /hello request");
})
app.use((req,res)=>
{
    res.send("Heyy User Welcome to the world");
})

app.listen(1399);