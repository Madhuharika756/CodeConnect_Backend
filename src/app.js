
const express = require('express');
const { connectDb } = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config()

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/requests");
const { userRouter } = require('./routes/user');

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDb().then(() => {
    console.log("Database is connected successfully");

    app.listen(process.env.PORT, () => {
        console.log("App is listening at port number 1399");
    });
}).
    catch((err) => {
        console.log("Database is not connected");
    });