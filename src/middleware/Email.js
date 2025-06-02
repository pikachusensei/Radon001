import { transporter } from "../middleware/EmailConfig.js"

export const sendEmail=async(email,verificationToken)=>{
    try {
    const info = await transporter.sendMail({
        from: '"Radon" radon4125@gmail.com',
        to: email,
        subject: "Verify Your Email",
        text: "Verify Your Email", 
        html:verificationToken,
    });
    console.log("Email for verification send successfully!");
    
    } catch (error) {
        console.log(error);
    }
}

