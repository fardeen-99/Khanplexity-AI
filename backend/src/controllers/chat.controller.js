import { sendmessage, sendtitle, streammessage } from "../services/ai.service.js";
import chatmodel from "../models/chat.model.js";
import messagemodel from "../models/message.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ImageKit from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";
import dotenv from "dotenv";
dotenv.config();


const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_API_KEY
});

export const createChat = async (req, res, next) => {
    try {
        const { message, chatId, stream } = req.body;
        const image = req.file;


        let imageUrl = null;
        let title = null;
        let chat = null;
        let currentChatId = chatId || null;

        if (image) {
            const result = await imagekit.files.upload({
  file: await toFile(Buffer.from(image.buffer), 'file'),
  fileName: 'fileName',
  folder:"chats"
});
            imageUrl = result.url;
        }


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
            image: imageUrl,
        });

        // Retrieve chat history to provide memory to the AI
        const chatHistory = await messagemodel.find({ chat: currentChatId }).sort({ createdAt: 1 });

        if (stream) {
            // Set headers for SSE
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");

            // Send initial metadata
            res.write(`data: ${JSON.stringify({ type: "metadata", title, chatId: currentChatId, user: userMessage })}\n\n`);

            let fullAIResponse = "";
            const streamResponse = await streammessage(chatHistory);

            for await (const chunk of streamResponse) {
                let currentContent = "";
                
                // 1. If using LangChain streamEvents() which provides true token-by-token streaming
                if (chunk.event === "on_chat_model_stream") {
                    const token = chunk.data?.chunk?.content;
                    if (typeof token === "string" && token) {
                        fullAIResponse += token;
                        res.write(`data: ${JSON.stringify({ type: "chunk", content: token })}\n\n`);
                    }
                    continue; // Skip further processing, we handled the pure text token
                }

                // 2. Ignore non-text agent/tool diagnostic events
                if (chunk.event) continue;

                // 3. Fallback: Safely extract string from LangGraph / LangChain varying chunk formats
                if (chunk?.messages && Array.isArray(chunk.messages)) {
                    currentContent = chunk.messages[chunk.messages.length - 1].content || chunk.messages[chunk.messages.length - 1].text || "";
                } else if (typeof chunk === "object" && chunk !== null) {
                    const firstVal = Object.values(chunk)[0];
                    if (firstVal?.messages && Array.isArray(firstVal.messages)) {
                        currentContent = firstVal.messages[firstVal.messages.length - 1].content || firstVal.messages[firstVal.messages.length - 1].text || "";
                    } else if (chunk.content) {
                        currentContent = chunk.content;
                    } else if (chunk.output) {
                        currentContent = chunk.output;
                    }
                } else if (typeof chunk === "string") {
                    currentContent = chunk;
                }

                // Skip raw tool JSON dumps so they don't appear in the chat UI
                if (typeof currentContent === "string" && (currentContent.startsWith('{"') || currentContent.startsWith('[{"'))) {
                    continue;
                }

                if (!currentContent || typeof currentContent !== "string") continue;

                // Determine if Langchain sent a completely accumulated string, or just a new delta chunk
                let delta = currentContent;
                if (currentContent.startsWith(fullAIResponse)) {
                    delta = currentContent.slice(fullAIResponse.length);
                    fullAIResponse = currentContent;
                } else {
                    // If it is just a pure delta piece (or doesn't overlap), blindly append it
                    fullAIResponse += currentContent;
                }

                if (delta) {
                    res.write(`data: ${JSON.stringify({ type: "chunk", content: delta })}\n\n`);
                }
            }

            // Save the complete AI response
            const aiMessage = await messagemodel.create({
                chat: currentChatId,
                role: "ai",
                content: fullAIResponse,
            });

            // Send final message info and end the stream
            res.write(`data: ${JSON.stringify({ type: "done", ai: aiMessage })}\n\n`);
            return res.end();
        }

        // Synchronous response (fallback)
        const aiResponse = await sendmessage(chatHistory);
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
        if (res.headersSent) {
            res.write(`data: ${JSON.stringify({ type: "chunk", content: "\n\n[Error: AI generation failed midway]" })}\n\n`);
            res.end();
            console.error("Stream error after headers sent:", error);
        } else {
            next(error);
        }
    }
}


export const getAllChats = async (req, res, next) => {
    try {
        const chats = await chatmodel.find({ user: req.user.id }).sort({createdAt:-1})
        res.status(200).json({
            success:true,
            message:"Chats fetched successfully",
            chats
        });
    } catch (error) {
        next(error);
    }
}


export const getChat = async (req, res, next) => {
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
        next(error);
    }
}
export const deleteChat = async (req, res, next) => {
    try {
        const id = req.params.id;

        const chat = await chatmodel.findOne({ _id: id, user: req.user.id });

        if (!chat) {
            return next(new ErrorHandler("Chat not found", 404));
        }

        await chatmodel.deleteOne({ _id: id });
        await messagemodel.deleteMany({ chat: id });

        res.status(200).json({
            success: true,
            message: "Chat deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}


// const messages=await messagemodel.findById({chat:chattitle})

// if(!messages){
//     return res.status(404).json({
//         message:"messages not found"
//     })
// }







// }

