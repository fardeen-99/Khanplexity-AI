import messagemodel from "../models/message.model.js";
import chatmodel from "../models/chat.model.js";
import { sendtitle, sendmessage, streammessage } from "../services/ai.service.js";
import ImageKit from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";
import ErrorHandler from "../utils/ErrorHandler.js";

import dotenv from "dotenv";
dotenv.config();

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_API_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
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
                folder: "chats"
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

            try {
                for await (const chunk of streamResponse) {
                    let currentContent = "";

                    // agent.stream() returns node-level snapshots like:
                    // { agent: { messages: [AIMessage] } } or { tools: { messages: [...] } }
                    // Extract the latest message content from whatever format arrives.

                    if (chunk?.messages && Array.isArray(chunk.messages)) {
                        const last = chunk.messages[chunk.messages.length - 1];
                        currentContent = last?.content || last?.text || "";
                    } else if (typeof chunk === "object" && chunk !== null) {
                        const firstVal = Object.values(chunk)[0];
                        if (firstVal?.messages && Array.isArray(firstVal.messages)) {
                            const last = firstVal.messages[firstVal.messages.length - 1];
                            currentContent = last?.content || last?.text || "";
                        } else if (chunk.content) {
                            currentContent = chunk.content;
                        } else if (chunk.output) {
                            currentContent = chunk.output;
                        }
                    } else if (typeof chunk === "string") {
                        currentContent = chunk;
                    }

                    // Handle array content (Gemini sometimes returns content as array of parts)
                    if (Array.isArray(currentContent)) {
                        currentContent = currentContent
                            .map((part) => (typeof part === "string" ? part : part?.text ?? ""))
                            .join("");
                    }

                    // Skip non-string or empty content
                    if (!currentContent || typeof currentContent !== "string") continue;

                    // Skip raw tool JSON dumps (Tavily results etc.)
                    if (currentContent.trim().startsWith('[{"') || currentContent.trim().startsWith('{"query"')) continue;

                    // agent.stream() sends accumulated content, so compute the delta
                    let delta = currentContent;
                    if (currentContent.length > fullAIResponse.length && currentContent.startsWith(fullAIResponse)) {
                        delta = currentContent.slice(fullAIResponse.length);
                        fullAIResponse = currentContent;
                    } else if (!currentContent.startsWith(fullAIResponse)) {
                        // Pure delta chunk or completely new content
                        fullAIResponse += currentContent;
                    } else {
                        // No new content
                        continue;
                    }

                    if (delta) {
                        res.write(`data: ${JSON.stringify({ type: "chunk", content: delta })}\n\n`);
                    }
                }
            } catch (streamError) {
                console.error("Stream disrupted:", streamError.message);
                const errorMsg = "\n\n**[Stream Error]**: AI generation was interrupted. Please try again in a moment.";
                res.write(`data: ${JSON.stringify({ type: "chunk", content: errorMsg })}\n\n`);
                fullAIResponse += errorMsg;
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
        const chats = await chatmodel.find({ user: req.user.id }).sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            message: "Chats fetched successfully",
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
            success: true,
            message: "Chat fetched successfully",
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

