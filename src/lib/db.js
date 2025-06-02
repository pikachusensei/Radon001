import mongoose from "mongoose";
import "dotenv/config";

 export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    }catch(error){
        console.log(error); 
        process.exit(1);//in case of failure
    }
}

