import express from "express";
import { registerUser,verifyEmail } from "../controllers/authController.js";
import { loginUser } from "../controllers/authController.js";


const router=express.Router();

router.get("/register",(req,res)=>{
    res.send("register")            //#
})
router.get("/login",(req,res)=>{
    res.send("login")               //#
})

router.post("/register",registerUser);

router.post("/login",loginUser);
router.post("/verifyEmail",verifyEmail);
router.post('/resendCode', resendCode);

export default router;
