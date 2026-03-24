import { sendmessage, sendtitle } from "../services/ai.service.js";
import chatmodel from "../models/chat.model.js";
import messagemodel from "../models/message.model.js";

export const createChat = async (req, res) => {
    try {
        const { message, chatId } = req.body;

        let title=null;
        let chat=null;
        let currentChatId = chatId || null;

        // Create new chat if chatId is not provided
        if (!chatId) {
            title = await sendtitle(message);
            chat = await chatmodel.create({
                title,
                user: req.user.id,
            });
            currentChatId = chat._id;
        }

        // Save the user's message
        const userMessage = await messagemodel.create({
            chat: currentChatId,
            role: "user",
            content: message,
        });

        // Retrieve and sort chat history to provide memory to the AI
        const chatHistory = await messagemodel.find({ chat: currentChatId });

        console.log(chatHistory);

        // Get AI response considering the entire history
        const aiResponse = await sendmessage(chatHistory);

        // Save the AI's response
        const aiMessage = await messagemodel.create({
            chat: currentChatId,
            role: "ai",
            content: aiResponse,
        });

        res.status(200).json({
            title,
            chatId: currentChatId,
            user: userMessage,
            ai: aiMessage,
        });
    } catch (error) {
        console.error("Error in createChat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllChats = async (req, res) => {
    try {
        const chats = await chatmodel.find({ user: req.user.id });
        res.status(200).json({
            success:true,
            message:"Chats fetched successfully",
            chats
        });
    } catch (error) {
        console.error("Error in getAllChats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getChat = async (req, res) => {
    try {
        const chatId = req.params.id;
        // const chat = await chatmodel.findById(chatId);
        const messages = await messagemodel.find({ chat: chatId });

        res.status(200).json({
            success:true,
            message:"Chat fetched successfully",
            messages
        });
    } catch (error) {
        console.error("Error in getChat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const deleteChat=async(req,res)=>{

const id=req.params.id



const chattitle=await chatmodel.findById({_id:id,user:req.user.id})

if(!chattitle){
    return res.status(404).json({
        message:"chat title not found"
    })
}

await chatmodel.deleteOne({_id:id})

await messagemodel.deleteMany({chat:id})


res.status(200).json({
    messgae:"chat deleted succesfully"
})


// const messages=await messagemodel.findById({chat:chattitle})

// if(!messages){
//     return res.status(404).json({
//         message:"messages not found"
//     })
// }







}

