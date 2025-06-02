import feedbackModel from "../models/AppFeedbackModel.js";


export const feedback=async(req,res)=>{
    try {
       const {message}=req.body;
       const newFeedback=await feedbackModel.create({message});  
       res.status(200).json({message:"Feedback sent successfully"}); 
    } catch (error) {
        res.status(500).json({ message: "Error sending feedback", error: error.message });
    }
}