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
