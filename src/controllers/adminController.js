import questionModel from "../models/questionModel.js"; 
import bcrypt from "bcrypt";


//admin add question

export const adminAddQues =async(req,res)=>{
  
    const {company,questionText,topic}=req.body;
    if(!company || !questionText || !topic)
    return res.status(400).send("All fields are required");
    try {
    const newQuestion=await questionModel.create({
      company,
      questionText,
      topic,
    });

    res.status(201).json({message:"Question added successfully",ques:newQuestion});
    
    
  } catch (err) {
    res.status(500).json({ message: "Error adding question", error: err });
  }
};


export const createAdmin = async (req, res) => {
  const { FirstName, LastName, Email, Password, confirmPassword, secretCode } = req.body;

  if (secretCode !== process.env.ADMIN_CREATION_CODE) {
    return res.status(403).json({ message: "Not Admin" });
  }

  if (Password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const existingUser = await userModel.findOne({ Email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(Password, 10);

  const newAdmin = await userModel.create({
    FirstName,
    LastName,
    Email,
    Password: hashedPassword,
    role: "admin"
  });

  res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
};