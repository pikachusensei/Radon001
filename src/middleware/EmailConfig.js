import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: parseInt(process.env.Email_Port, 10),
  secure: false, // true for 465, false for other ports
  auth: {
    user: "radon4125@gmail.com",
    pass: process.env.PASS,
  },
});

