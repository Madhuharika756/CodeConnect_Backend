const mongoose = require("mongoose");

const connectDb = async()=>{
    await mongoose.connect(process.env.DB_CONNETION_STRING);
}
module.exports = {connectDb};
