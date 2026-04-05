import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import chatRoutes from "./routes/chat.route.js";
import { errorMiddleware } from "./middleware/error.middlewar.js";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.static("public"))




app.use("/api/auth",authRoutes);
app.use("/api/chat",chatRoutes);

app.use(errorMiddleware);

app.get("*Name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

export default app;