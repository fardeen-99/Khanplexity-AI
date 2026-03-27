import { Router } from "express";
const chatRouter = Router();
import {authMiddleware} from "../middleware/auth.middleware.js";
import {createChat
    ,getAllChats,getChat,deleteChat
} from "../controllers/chat.controller.js";
import multer from 'multer'

const upload=multer({
    storage:multer.memoryStorage(),
    limits:{fileSize:1024*1024*5}
})



chatRouter.post("/",authMiddleware,upload.single("file"),createChat);
chatRouter.get("/allchats",authMiddleware,getAllChats);
chatRouter.get("/:id/message",authMiddleware,getChat);
chatRouter.delete("/delete/:id",authMiddleware,deleteChat);

export default chatRouter;