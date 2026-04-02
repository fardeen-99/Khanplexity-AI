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

const generateImageTool = tool(async ({ prompt }) => {
    const seed = Math.floor(Math.random() * 1000000);
    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${seed}&model=flux&nologo=true`;
    return `![${prompt}](${imageUrl})`;
}, {
    name: "generateImage",
    description: "Generate an image based on a text prompt using Stable Diffusion. Use this when the user asks to 'generate', 'create', or 'draw' an image.",
    schema: z.object({
        prompt: z.string().describe("Detailed description of the image to generate")
    })
});

const googleAgent = createAgent({
    model: googleModel,
    tools: [searchTool, generateImageTool],
    systemMessage: `
You are a conversational assistant.

Language rules:
1. If user writes in English → reply in English.
2. If user writes in Hinglish → reply ONLY in Hinglish (English letters only).
3. If user writes in Hindi → reply in Hindi.

Strict rules:
- ALWAYS match user's script (VERY IMPORTANT)
- NEVER convert Hinglish to Hindi script
- NEVER copy tool output directly
- ALWAYS rewrite answer in user's style
- Hinglish must look like: "dhurandar ne abtak 1000 crore kama liye hain"

Tool handling:
- If tool returns Hindi → convert it to Hinglish before answering
- Do not output raw tool text

Image Generation:
- Use the generateImage tool when a user asks to create, draw, or generate an image.
- When the tool returns the image markdown (e.g. ![prompt](url)), you MUST include it exactly as provided in your final response.

Final Answer Rule:
- Ensure final output matches user's language EXACTLY
`

})

const mistralAgent = createAgent({
    model: mistralModel,
    tools: [searchTool, generateImageTool],
    systemMessage: `
You are a conversational assistant.

Language rules:
1. If user writes in English → reply in English.
2. If user writes in Hinglish → reply ONLY in Hinglish (English letters only).
3. If user writes in Hindi → reply in Hindi.

Strict rules:
- ALWAYS match user's script (VERY IMPORTANT)
- NEVER convert Hinglish to Hindi script
- NEVER copy tool output directly
- ALWAYS rewrite answer in user's style
- Hinglish must look like: "dhurandar ne abtak 1000 crore kama liye hain"

Tool handling:
- If tool returns Hindi → convert it to Hinglish before answering
- Do not output raw tool text

Image Generation:
- Use the generateImage tool when a user asks to create, draw, or generate an image.
- When the tool returns the image markdown (e.g. ![prompt](url)), you MUST include it exactly as provided in your final response.

Final Answer Rule:
- Ensure final output matches user's language EXACTLY
`
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
    });

    try {
        const response = await googleAgent.invoke({ messages });
        return response.messages[response.messages.length - 1].content;
    } catch (error) {
        console.error("Google Agent failed, falling back to Mistral:", error.message);

        // Strip images for Mistral fallback since it doesn't support vision
        const textOnlyMessages = message.map((msg) => {
            if (msg.role === "user") return new HumanMessage(msg.content);
            return new AIMessage(msg.content);
        });

        const response = await mistralAgent.invoke({ messages: textOnlyMessages });
        return response.messages[response.messages.length - 1].content;
    }
}

export async function* streammessage(message) {
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
            return new HumanMessage(msg.content || "");
        } else {
            return new AIMessage(msg.content || "");
        }
    });

    try {
        const stream = await googleAgent.streamEvents({ messages }, { version: "v2" });
        const iterator = stream[Symbol.asyncIterator]();
        
        // Intercepting the very first stream chunk. 
        // If Google Gemini API returns 429 Rate Limit Exceeded, it will throw an Error HERE instead of in the controller!
        const firstChunk = await iterator.next();
        if (!firstChunk.done) {
            yield firstChunk.value;
        }
        
        // If Google succeeds, yield the rest of the stream
        yield* iterator;
        
    } catch (error) {
        console.error("Google Agent stream failed (Rate Limit/Network Error). Initiating Mistral Fallback Protocol:", error.message);

        // Strip images for Mistral fallback
        const textOnlyMessages = message.map((msg) => {
            if (msg.role === "user") return new HumanMessage(msg.content || "");
            return new AIMessage(msg.content || "");
        });

        const mistralStream = await mistralAgent.streamEvents({ messages: textOnlyMessages }, { version: "v2" });
        yield* mistralStream;
    }
}
