import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import chatRoutes from "./routes/chat.route.js";
import { errorMiddleware } from "./middleware/error.middlewar.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({
    origin:process.env.LINK,
    credentials:true
}));


app.use("/api/auth",authRoutes);
app.use("/api/chat",chatRoutes);

app.use(errorMiddleware);

export default app;