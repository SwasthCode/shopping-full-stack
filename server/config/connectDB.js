import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if(!"mongodb+srv://anshu:anshu123@shop.zgqtr.mongodb.net/?retryWrites=true&w=majority&appName=Shop"){
    throw new Error(
        "Please provide MONGODB_URI in the .env file"
    )
}

async function connectDB(){
    try {
        await mongoose.connect("mongodb+srv://anshu:anshu123@shop.zgqtr.mongodb.net/?retryWrites=true&w=majority&appName=Shop")
        console.log("connect DB")
    } catch (error) {
        console.log("Mongodb connect error",error)
        process.exit(1)
    }
}

export default connectDB