import usermodel from "../models/auth.model.js";
import { sendmail } from "../services/mail.service.js";
import jwt from 'jsonwebtoken'
import redis from "../config/cache.js";

export const register = async (req,res) => {

    try {
        
const {username,email,password} = req.body;

const isuseralreadyexists = await usermodel.findOne({
    $or:[
        {username},
        {email}
    ]
})

if(isuseralreadyexists){
    return res.status(400).json({
        success:false,
        message:"User already exists"
    })
}

    const verificationLink = `http://localhost:${process.env.PORT || 3000}/api/auth/verify/${email}`;

    await sendmail({
        to: email,
        subject: "Verify your email",
        html: `
        <div style="font-family: sans-serif; text-align: center; padding: 20px;">
            <h1>Verify your email</h1>
            <p>Click the button below to verify your account.</p>
            <a href="${verificationLink}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
        </div>
        <p>thanks for joining khanplexity</p>
        <p>regards,</p>
        <p>khanplexity team</p>
        `
    })


const user = await usermodel.create({
    username,
    email,
    password
})


res.status(201).json({
    success:true,
    message:"User created successfully",
    user:{
        username:user.username,
        email:user.email,
        isverified:user.isverified
    }
})

    } catch (error) {
  
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }

}

export const verify = async (req,res) => {
    try {
        const email = req.params.id;
        const user = await usermodel.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        const loginUrl = "http://localhost:5173/login"; // Adjust this to your frontend URL

        const htmlResponse = (message, status) => `
        <div style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: ${status === 'success' ? '#28a745' : '#ffc107'};">${message}</h1>
            <p>You can now close this tab or go to the login page.</p>
            <a href="${loginUrl}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Go to Login</a>
        </div>
        `;

        if (user.isverified) {
            return res.send(htmlResponse("You are already verified!", "info"));
        }

        user.isverified = true;
        await user.save();

        return res.send(htmlResponse("Email verified successfully!", "success"));
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


export const login = async (req,res) => {
         const {email,password} = req.body;

    const user=await usermodel.findOne({email})

    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }

    if(!user.isverified){
        return res.status(401).json({
            success:false,
            message:"User not verified"
        })
    }

    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid){
        return res.status(401).json({
            success:false,
            message:"Invalid password"
        })
    }

    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"7d"})

    res.cookie("token",token)


    res.status(200).json({
        success:true,
        message:"User logged in successfully",
        user:{
            username:user.username,
            email:user.email,
            isverified:user.isverified
        }
    })


}

export const logout = async (req,res) => {
    try {
        const token=req.cookies.token
        res.clearCookie("token")
        redis.set(token,Date.now(),"EX",60*60)
        
        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const getme = async (req,res) => {
    try {
        const user = await usermodel.findById(req.user.id);
        res.status(200).json({
            success:true,
            message:"your data fetched successfully",
            user:{
                username:user.username,
                email:user.email,
                isverified:user.isverified
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}