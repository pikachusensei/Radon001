import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "radon4125@gmail.com",
    pass: "aggk cszy kesb gzxc",
  },
});

