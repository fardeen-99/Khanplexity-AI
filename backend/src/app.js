import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import chatRoutes from "./routes/chat.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));


app.use("/api/auth",authRoutes);
app.use("/api/chat",chatRoutes);


export default app;