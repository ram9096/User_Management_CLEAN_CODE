import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export const connectDB = async ()=>{
    try {
        
        const connect = await mongoose.connect(process.env.MONGODB_URL as string)
        console.log(`Mongodb connected : ${connect.connection.host}`)
    } catch (error) {
        console.log(`Mongodb connection error : ${error}`)
    }
}