import dotenv from "dotenv";
dotenv.config();

import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import * as z from "zod";
import { tool, createAgent } from "langchain";
import search from "./Internet.service.js";
// import { sendagentmail } from "./agentmail.service.js";

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
        query: z.string().describe("the query to search for latest information"),
    }),
});

const sharedSystemMessage = `
You are a conversational assistant.

Language rules:
1. If user writes in English -> reply in English.
2. If user writes in Hinglish -> reply ONLY in Hinglish (English letters only).
3. If user writes in Hindi -> reply in Hindi.

Fresh info rules:
- If the user asks for current, latest, recent, today, this year, or anything time-sensitive, use the searchInternet tool first.
- Prefer tool results over memory when answering factual or time-sensitive questions.
- Do not guess if fresh information is needed.

Strict rules:
- ALWAYS match user's script (VERY IMPORTANT)
- NEVER convert Hinglish to Hindi script
- NEVER copy tool output directly
- ALWAYS rewrite answer in user's style
- Hinglish must look like: "dhurandar ne abtak 1000 crore kama liye hain"

Tool handling:
- If tool returns Hindi -> convert it to Hinglish before answering
- Do not output raw tool text

Final Answer Rule:
- Ensure final output matches user's language EXACTLY
`;

const googleAgent = createAgent({
    model: googleModel,
    tools: [searchTool],
    systemMessage: sharedSystemMessage,
});

const mistralAgent = createAgent({
    model: mistralModel,
    tools: [searchTool],
    systemMessage: sharedSystemMessage,
});

const STYLE = {
    ENGLISH: "english",
    HINGLISH: "hinglish",
    HINDI: "hindi",
};

const extractTextContent = (content) => {
    if (typeof content === "string") return content;

    if (Array.isArray(content)) {
        return content
            .filter((item) => item?.type === "text")
            .map((item) => item.text || "")
            .join(" ");
    }

    return "";
};

const stripBasicMarkdown = (text) =>
    text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/__(.*?)__/g, "$1")
        .replace(/`([^`]+)`/g, "$1");

const getLastUserInput = (message = []) => {
    for (let index = message.length - 1; index >= 0; index -= 1) {
        if (message[index]?.role === "user") {
            return extractTextContent(message[index].content);
        }
    }
    return "";
};

function detectLanguageStyle(text = "") {
    const hasDevanagari = /[\u0900-\u097F]/.test(text);
    const hasEnglish = /[a-zA-Z]/.test(text);
    const looksLikeHinglish =
        /\b(kya|kaun|kon|kyu|kyun|kab|kaise|kis|mera|meri|mere|mujhe|main|mein|mai|tha|thi|the|hai|hain|nahi|agar|aur|tum|aap|kar|kr|batao|btado|bolo|ye|woh|wo|isko|usko|sakta|sakti|krna|karna)\b/i.test(
            text
        );

    if (hasEnglish && !hasDevanagari) {
        return looksLikeHinglish ? STYLE.HINGLISH : STYLE.ENGLISH;
    }

    if (hasDevanagari) {
        return STYLE.HINDI;
    }

    return STYLE.ENGLISH;
}

const getStyleInstruction = (style) => {
    if (style === STYLE.HINGLISH) {
        return `The latest user message is in Hinglish.
Reply ONLY in natural Hinglish using English letters.
Do not use Devanagari script at all.
Do not use Hindi unicode characters at all.
Do not switch to formal Hindi.
Keep the answer plain text without markdown bold.`;
    }

    if (style === STYLE.HINDI) {
        return `The latest user message is in Hindi.
Reply in Hindi using Devanagari script.
Do not transliterate Hindi into English letters unless the user asks.`;
    }

    return `The latest user message is in English.
Reply in English.`;
};

const toConversationMessages = (
    message,
    { allowImages = true, styleInstruction = "" } = {}
) => {
    const conversation = [];

    if (styleInstruction) {
        conversation.push(new SystemMessage(styleInstruction));
    }

    for (const msg of message) {
        if (msg.role === "user") {
            if (allowImages && msg.image) {
                conversation.push(
                    new HumanMessage({
                        content: [
                            { type: "text", text: msg.content || "" },
                            { type: "image_url", image_url: { url: msg.image } },
                        ],
                    })
                );
                continue;
            }

            conversation.push(new HumanMessage(msg.content || ""));
            continue;
        }

        conversation.push(new AIMessage(msg.content || ""));
    }

    return conversation;
};

const shouldRewriteForStyle = (text, style) => {
    if (!text || typeof text !== "string") return false;

    if (style === STYLE.HINGLISH) {
        return /[\u0900-\u097F]/.test(text);
    }

    if (style === STYLE.HINDI) {
        return /[a-zA-Z]{4,}/.test(text) && !/[\u0900-\u097F]/.test(text);
    }

    return false;
};

const rewriteResponse = async (content, style) => {
    const rewritePrompt = new SystemMessage(`Rewrite the assistant response to match the user's language style.

Target style: ${style}

Rules:
- Preserve the original meaning exactly.
- Keep the answer concise and natural.
- Output only the rewritten answer.
- No markdown formatting.
- If target style is hinglish, use English letters only and do not use Devanagari at all.`);

    const userPrompt = new HumanMessage(content);

    try {
        const rewritten = await googleModel.invoke([rewritePrompt, userPrompt]);
        return extractTextContent(rewritten.content).trim() || content;
    } catch (error) {
        const rewritten = await mistralModel.invoke([rewritePrompt, userPrompt]);
        return extractTextContent(rewritten.content).trim() || content;
    }
};

const enforceStyle = async (content, style) => {
    const text = stripBasicMarkdown(extractTextContent(content).trim());

    if (!shouldRewriteForStyle(text, style)) {
        return text;
    }

    return await rewriteResponse(text, style);
};

export const sendtitle = async (message) => {
    try {
        const sysMsg = new SystemMessage(`
You are an AI assistant that generates natural, human-like chat titles, similar to ChatGPT.

Rules:
- Generate a short title (2-3 words only)
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
};

export const sendmessage = async (message) => {
    const style = detectLanguageStyle(getLastUserInput(message));
    const styleInstruction = getStyleInstruction(style);
    const messages = toConversationMessages(message, {
        allowImages: true,
        styleInstruction,
    });

    try {
        const response = await googleAgent.invoke({ messages });
        return await enforceStyle(
            response.messages[response.messages.length - 1].content,
            style
        );
    } catch (error) {
        console.error("Google Agent failed, falling back to Mistral:", error.message);

        const textOnlyMessages = toConversationMessages(message, {
            allowImages: false,
            styleInstruction,
        });

        const response = await mistralAgent.invoke({ messages: textOnlyMessages });
        return await enforceStyle(
            response.messages[response.messages.length - 1].content,
            style
        );
    }
};

export const streammessage = async (message) => {
    const style = detectLanguageStyle(getLastUserInput(message));
    const styleInstruction = getStyleInstruction(style);
    const messages = toConversationMessages(message, {
        allowImages: true,
        styleInstruction,
    });

    try {
        const rawStream = await googleAgent.stream({ messages });
        return normalizeStreamResponse(rawStream, style);
    } catch (error) {
        console.error("Google Agent stream failed, falling back to Mistral:", error.message);

        const textOnlyMessages = toConversationMessages(message, {
            allowImages: false,
            styleInstruction,
        });

        const rawStream = await mistralAgent.stream({ messages: textOnlyMessages });
        return normalizeStreamResponse(rawStream, style);
    }
};

async function* normalizeStreamResponse(stream, style) {
    let completeText = "";

    for await (const chunk of stream) {
        const lastMessage = chunk?.messages?.[chunk.messages.length - 1];
        const chunkText = lastMessage?.text || extractTextContent(lastMessage?.content);

        if (chunkText) {
            completeText += chunkText;
        }
    }

    const normalizedText = await enforceStyle(completeText, style);

    yield {
        messages: [
            {
                text: normalizedText,
            },
        ],
    };
}
