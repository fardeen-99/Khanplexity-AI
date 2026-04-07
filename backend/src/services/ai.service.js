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

const googleAgent = createAgent({
    model: mistralModel,
    tools: [searchTool],
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
- NEVER output raw JSON, tool results, or any data structure. EVER.
- When the search tool returns data, READ it internally and WRITE your own clean, natural answer.

Tool handling:
- If tool returns Hindi → convert it to Hinglish before answering
- Do not output raw tool text

IMPORTANT:
- For ANY query related to current events, news, weather, sports, or recent updates:
  ALWAYS use the searchInternet tool.
- Never answer from your own knowledge for such queries.

Final Answer Rule:
- Ensure final output matches user's language EXACTLY
- No JSON. No raw objects. No tool output dumps.


CRITICAL:
- When using search results, ALWAYS prefer the most recent date from results.
- If results contain older data (e.g. 2025), ignore them unless nothing newer exists.
- Always mention the latest available update from results.
`

})

const mistralAgent = createAgent({
    model: googleModel,
    tools: [searchTool],
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
- NEVER output raw JSON, tool results, or any data structure. EVER.
- When the search tool returns data, READ it internally and WRITE your own clean, natural answer.

Tool handling:
- If tool returns Hindi → convert it to Hinglish before answering
- Do not output raw tool text

IMPORTANT:
- For ANY query related to current events, news, weather, sports, or recent updates:
  ALWAYS use the searchInternet tool.
- Never answer from your own knowledge for such queries.

Final Answer Rule:
- Ensure final output matches user's language EXACTLY
- No JSON. No raw objects. No tool output dumps.

CRITICAL:
- When using search results, ALWAYS prefer the most recent date from results.
- If results contain older data (e.g. 2025), ignore them unless nothing newer exists.
- Always mention the latest available update from results.

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
    // Always inject the real current date so the AI never guesses it
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZoneName: "short" });

    const messages = [
        new SystemMessage(`Current date and time: ${dateStr}, ${timeStr}. Use this as the real today's date in all your responses.`),
        ...message.map((msg) => {
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
    ];

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

export const streammessage = async (message) => {
    // Always inject the real current date so the AI never guesses it
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZoneName: "short" });

    const messages = [
        new SystemMessage(`Current date and time: ${dateStr}, ${timeStr}. Use this as the real today's date in all your responses.`),
        ...message.map((msg) => {
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
    ];

    try {
        return await googleAgent.stream({ messages }, { streamMode: "messages" });
    } catch (error) {
        console.error("Google Agent stream failed, falling back to Mistral:", error.message);

        // Strip images for Mistral fallback
        const textOnlyMessages = message.map((msg) => {
            if (msg.role === "user") return new HumanMessage(msg.content);
            return new AIMessage(msg.content);
        });

        return await mistralAgent.stream({ messages: textOnlyMessages }, { streamMode: "messages" });
    }
}

