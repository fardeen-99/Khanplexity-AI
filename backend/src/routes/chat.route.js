import { Router } from "express";
const chatRouter = Router();
import {authMiddleware} from "../middleware/auth.middleware.js";
import {createChat
    ,getAllChats,getChat,deleteChat
} from "../controllers/chat.controller.js";

chatRouter.post("/",authMiddleware,createChat);
chatRouter.get("/allchats",authMiddleware,getAllChats);
chatRouter.get("/:id/message",authMiddleware,getChat);
chatRouter.delete("/delete/:id",authMiddleware,deleteChat);

export default chatRouter;