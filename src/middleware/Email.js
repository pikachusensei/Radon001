import { transporter } from "../middleware/EmailConfig.js"

export const sendEmail = async (email, verificationToken) => {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #4CAF50;">Radon Email Verification</h2>
        <p>Hi there,</p>
        <p>Thank you for registering on <strong>Radon</strong>.</p>
        <p>Please use the following code to verify your email address:</p>
        <h1 style="background: #f2f2f2; padding: 10px; border-radius: 5px; display: inline-block;">
          ${verificationToken}
        </h1>
        <p>This code will expire soon. If you did not request this, please ignore this email.</p>
        <br>
        <p style="font-size: 12px; color: gray;">&copy; 2025 Radon. All rights reserved.</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: '"Radon" radon4125@gmail.com',
      to: email,
      subject: "Verify Your Email",
      text: `Your verification code is: ${verificationToken}`,
      html: htmlContent,
    });

    console.log("Email for verification sent successfully!");
  } catch (error) {
    console.log(error);
  }
}

