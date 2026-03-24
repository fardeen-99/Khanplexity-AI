import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
    service:"gmail",
  auth:{
    type:"OAuth2",
    user:process.env.USER_EMAIL,
    clientId:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    refreshToken:process.env.REFRESH_TOKEN,
  }  
})

transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

export const sendmail = async ({ to, subject, text = "", html = "" }) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html
    }

    await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully");
    return "YOUR MAIL HAS BEEN SENT";
}