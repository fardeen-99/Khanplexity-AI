import dotenv from "dotenv";
dotenv.config();
import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from '@langchain/mistralai'
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import * as z from "zod"
import { tool, createAgent } from "langchain"
import search from "./Internet.service.js"


const googleModel = new ChatGoogle({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API,
});

// const textendpoint = (prompt) => `https://gen.pollinations.ai/text/${prompt}?model=kimi&key=${process.env.WDF_API_KEY}`



const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API,
});

const searchTool = tool(search, {
    name: "searchInternet",
    description: "use this tool to search the internet for latest information",
    schema: z.object({
        query: z.string().describe("the query to search for latest information")
    })
})

const agent = createAgent({
    model: googleModel,
    tools: [searchTool],
    systemMessage: "You are a helpful assistant that answers questions using the tools provided",

})


export const sendtitle = async (message) => {
    try {
        const sysMsg = new SystemMessage(`
You are an AI assistant that generates natural, human-like chat titles, similar to ChatGPT.

Rules:
- Generate a short title (2–3 words only)
- Make it sound natural and meaningful (not robotic)
- Capture the main intent of the user's message
- Use simple, commonly used words
- No quotes, no punctuation at the end
- No filler words like "Conversation", "Chat", "Discussion"
- Prefer action or topic-based titles (like "Fix Login Bug", "React Setup Help")

Style:
- Clean, minimal, and modern
- Should feel like something a real user would name their chat
- Avoid generic titles like "Help" or "Question"

Output only the title.
`);
        const humMsg = new HumanMessage(message);

        const response = await mistralModel.invoke([sysMsg, humMsg]);
        return response.content.trim();
    } catch (error) {
        console.error("Error generating title:", error);
        return "New Chat";
    }
}

export const sendmessage = async (message) => {
    const messages = message.map((msg) => {
        if (msg.role === "user") {
            if (msg.image) {
                return new HumanMessage({
                    content: [
                        { type: "text", text: msg.content || "" },
                        { type: "image_url", image_url: { url: msg.image } }
                    ]
                });
            }
            return new HumanMessage(msg.content);
        } else {
            return new AIMessage(msg.content);
        }
        })
        const response = await agent.invoke({ messages })
        return response.messages[response.messages.length - 1].content
}

export const streammessage = async (message) => {
    const messages = message.map((msg) => {
        if (msg.role === "user") {
            if (msg.image) {
                return new HumanMessage({
                    content: [
                        { type: "text", text: msg.content || "" },
                        { type: "image_url", image_url: { url: msg.image } }
                    ]
                });
            }
            return new HumanMessage(msg.content);
        } else {
            return new AIMessage(msg.content);
        }
    });

        return await agent.stream({ messages });
}
