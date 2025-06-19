const mongoose = require("mongoose");

const connectDb = async()=>{
    await mongoose.connect("mongodb+srv://maduharikac:0dLlAGix4sZ7qMPn@cluster0.ukoeddr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/devTinder");
}

module.exports = {connectDb};
