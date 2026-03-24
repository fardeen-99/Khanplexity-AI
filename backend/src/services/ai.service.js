import dotenv from "dotenv";
dotenv.config();
import { ChatGoogle } from "@langchain/google";
import {ChatMistralAI} from '@langchain/mistralai'
import { AIMessage,HumanMessage,SystemMessage } from "@langchain/core/messages";

const googleModel = new ChatGoogle({
    model:"gemini-2.5-flash",
    apiKey:process.env.GOOGLE_API,
});
const mistralModel = new ChatMistralAI({
    model:"mistral-small-latest",
    apiKey:process.env.MISTRAL_API,
});



    export const sendtitle = async (message) => {
        try {
            const sysMsg =new SystemMessage(`You are a helpful assistant that generates short, concise, and descriptive titles for chat conversations. 
            Based on the user's first message, provide a title that is 2-4 words long. 
            Do not use quotes or any preamble. Just the title.`);
            const humMsg = new HumanMessage(message);

            const response = await mistralModel.invoke([sysMsg, humMsg]);
        return response.content.trim();
    } catch (error) {
        console.error("Error generating title:", error);
        return "New Chat";
    }
}

export const sendmessage = async (message) => {
    const messages=message.map((message)=>{
        if(message.role==="user"){
            return new HumanMessage(message.content);
        }
        else{
            return new AIMessage(message.content);
        }
    })
    const response=await googleModel.invoke(messages);
    return response.content;
}

// export default googleModel;