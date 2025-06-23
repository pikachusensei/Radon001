import userModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generate_key.js";
import crypto from "crypto";
import { sendEmail } from "../middleware/Email.js";
import nodemailer from "nodemailer";

let tempRegistrations={};//js object;
// Register User
export const registerUser = async (req, res) => {
  try {
    const {
      FirstName,
      LastName,
      University,
      GraduationYear,
      Email,
      Password,
      confirmPassword,
    } = req.body;

    if (Password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const existingUser = await userModel.findOne({ Email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const profileImage = `https://api.dicebear.com/9.x/croodles/svg?seed=${FirstName}`;
    const verificationToken=Math.floor(100000+Math.random() * 9000000).toString();
    tempRegistrations[Email]={
      FirstName,
      LastName,
      University,
      GraduationYear,
      Email,
      Password: hashedPassword,
      profileImage,
      verificationToken,

    };

    await sendEmail(Email,verificationToken);

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resendCode=async(req,res)=>{
  try{
    const {Email}=req.body;
    const tempUser=tempRegistrations[Email];
    if(!tempUser) return res.status(400).json({message:"User not found or expired!"});

    const newToken=Math.floor(100000+Math.random() * 9000000).toString();
    tempUser.verificationToken=newToken;
    await sendEmail(Email,newToken);
    res.status(200).json({message:"Verification code resent successfully"});
  }catch(error){
    console.error("Error in resendCode:",error);
    res.status(500).json({message:"Internal server error"});
  }
};

export const verifyEmail=async(req,res)=>{
  try {
    const {Email,verificationToken}=req.body;
    const tempUser =tempRegistrations[Email];
    if(!tempUser ) return res.status(400).json({message:"User not found or expired!"});
    if(tempUser .verificationToken!==verificationToken) return res.status(400).json({message:"Invalid verification token"});

    
    const newUser = await userModel.create({
      FirstName: tempUser .FirstName,
      LastName: tempUser .LastName,
      University: tempUser .University,
      GraduationYear: tempUser .GraduationYear,
      Email: tempUser .Email,
      Password: tempUser .Password,//already hashed
      profileImage: tempUser .profileImage,
      isVerified: true
    });

    // Cleanup temp
    delete tempRegistrations[Email];

    res.status(200).json({message:"Email verified successfully",user: newUser});
  } catch (error) {
    console.error("Error in verifyEmail:");
    res.status(500).json({ message: "Internal server error" });
  }
}
// Login User
export const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const user = await userModel.findOne({ Email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user);

    // res.cookie("token", token);//no need in mobile
    res.status(200).json({ message: "Login successful", token, user: user });//we will just send the token here
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) return res.status(400).json({ message: 'Email is required' });

//     const user = await User.findOne({ Email: email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const token = crypto.randomBytes(32).toString('hex');
//     const expiry = Date.now() + 10 * 60 * 1000; // 10 mins

//     user.resetToken = token;
//     user.resetTokenExpiry = expiry;
//     await user.save();

//     const resetLink = `https://yourfrontend.com/reset-password?token=${token}`;

//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: 'your_email@gmail.com',
//         pass: 'your_gmail_app_password',
//       },
//     });

//     await transporter.sendMail({
//       from: '"Campus App" <noreply@campus.com>',
//       to: email,
//       subject: 'Password Reset',
//       html: `
//         <p>Hello ${user.FirstName},</p>
//         <p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 10 minutes.</p>
//       `,
//     });

//     res.json({ message: 'Password reset link sent to email.' });
//   } catch (err) {
//     console.error('Forgot Password Error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const resetPassword = async (req, res) => {
//   const { token, newPassword } = req.body;

//   const user = await userModel.findOne({
//     resetToken: token,
//     resetTokenExpiry: { $gt: Date.now() },
//   });

//   if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

//   user.Password = newPassword; // make sure to hash this if you're using bcrypt
//   user.resetToken = undefined;
//   user.resetTokenExpiry = undefined;

//   await user.save();
//   res.json({ message: 'Password reset successful' });
// };
