// // import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
// // const transporter = nodemailer.createTransport({
// //     service:"gmail",
// //   auth:{
// //     type:"OAuth2",
// //     user:process.env.USER_EMAIL,
// //     clientId:process.env.CLIENT_ID,
// //     clientSecret:process.env.CLIENT_SECRET,
// //     refreshToken:process.env.REFRESH_TOKEN,
// //   }  
// // })

// // transporter.verify((error, success) => {
// //   if (error) {
// //     console.error('Error connecting to email server:', error);
// //   } else {
// //     console.log('Email server is ready to send messages');
// //   }
// // });

// // import { Resend } from 'resend';

// // const resend = new Resend(process.env.RESEND_API_KEY);




// // export const sendmail = async ({ to, subject, html = "" }) => {
// //     const mailOptions = {
// //         from: "Website <website@resend.dev>",
// //         to,
// //         subject,
// //         // text,
// //         html
// //     }


// // await resend.emails.send(mailOptions);
// //     console.log("Mail sent successfully");
// //     return "YOUR MAIL HAS BEEN SENT";
// // }  

// import nodemailer from "nodemailer";
// // import dotenv from "dotenv";
// // dotenv.config();
// const transporter = nodemailer.createTransport({
//     service:"gmail",
//   auth:{
//     type:"OAuth2",
//     user:process.env.USER_EMAIL,
//     clientId:process.env.CLIENT_ID,
//     clientSecret:process.env.CLIENT_SECRET,
//     refreshToken:process.env.REFRESH_TOKEN,
//   }  
// })

// transporter.verify((error, success) => {
//   if (error) {
//     console.error('Error connecting to email server:', error);
//   } else {
//     console.log('Email server is ready to send messages');
//   }
// });



// export const sendmail = async ({ to, subject, text = "", html = "" }) => {
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to,
//         subject,
//         text,
//         html
//     }

//     await transporter.sendMail(mailOptions);
//     console.log("Mail sent successfully");
//     return "YOUR MAIL HAS BEEN SENT";
// }


import axios from "axios";

export const sendmail = async ({ to, subject, text = "", html = "" }) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Khanplexity", // optional
          email: process.env.USER_EMAIL, // 👈 sender email
        },
        to: [
          {
            email: to,
          },
        ],
        subject: subject,
        htmlContent: html || `<p>${text}</p>`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY, // 👈 API key
          "Content-Type": "application/json",
        },
      }
    );

    console.log("MAIL SENT ✅", response.data);
    return "MAIL SENT SUCCESSFULLY 🚀";
  } catch (error) {
    console.error("MAIL ERROR ❌", error.response?.data || error.message);
    return "MAIL FAILED ❌";
  }
};