import express from "express";
import "dotenv/config";
import { connectDB} from "./lib/db.js";
import authRoutes from "./Routes/authRoutes.js" ;
import cookieParser from "cookie-parser";
import adminRoutes from "./Routes/adminRoutes.js";
import questionRoutes from "./Routes/questionRoutes.js";

const app=express();
const PORT=process.env.PORT || 3000;


app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/questions",questionRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log("Server running...");
  connectDB();
});