import axios from "axios";

const APi=axios.create({
    baseURL:"http://localhost:3000/api/chat",
    withCredentials:true
})

export const getAllChats=async()=>{
    const response=await APi.get("/allchats")
    return response.data
}


export const deleteChat=async(id)=>{
    const response=await APi.delete(`/delete/${id}`)
    return response.data
}


export const getChat=async(id)=>{
    const response=await APi.get(`/${id}/message`)
    return response.data
}

export const sendMessage = async (message, chatId) => {
    if (message instanceof FormData) {
        // If it's a new chat, chatId might not be in the form yet
        if (chatId) message.append("chatId", chatId);
        const response = await APi.post("/", message);
        return response.data;
    }
    const response = await APi.post("/", { message, chatId });
    return response.data;
}

export const streamMessage = async (message, chatId, onChunk, onMetadata, onDone, onError) => {
    try {
        let body;
        let headers = {};

        if (message instanceof FormData) {
            if (chatId) message.append("chatId", chatId);
            message.append("stream", "true");
            body = message;
            // fetch automatically sets boundary for formData
        } else {
            body = JSON.stringify({ message, chatId, stream: true });
            headers["Content-Type"] = "application/json";
        }

        const response = await fetch("http://localhost:3000/api/chat/", {
            method: "POST",
            headers,
            body,
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            
            // Keep the last incomplete line in the buffer
            buffer = lines.pop();

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const dataStr = line.slice(6).trim();
                    if (!dataStr) continue;
                    
                    try {
                        const parsed = JSON.parse(dataStr);
                        if (parsed.type === "metadata" && onMetadata) {
                            onMetadata(parsed);
                        } else if (parsed.type === "chunk" && onChunk) {
                            onChunk(parsed.content);
                        } else if (parsed.type === "done" && onDone) {
                            onDone(parsed.ai);
                        }
                    } catch (e) {
                         console.error("Failed to parse stream chunk:", e);
                    }
                }
            }
        }
    } catch (err) {
        if (onError) onError(err);
    }
}
