import { useDispatch } from "react-redux"
import { deleteChat, getAllChats, getChat, streamMessage } from "../services/chat.service"
import { setChats,setLoading,setStreamStarted,updateLastMessage,setError,removeChat,setMessages,setCurrentChat, addMessage, addtitle } from "../chat.slice"

const useChat=()=>{

const dispatch=useDispatch()

const handlegetallchats=async()=>{
    try {
        dispatch(setLoading(true))
        const response=await getAllChats()
        dispatch(setChats(response.chats))
        dispatch(setLoading(false))
    } catch (error) {
        dispatch(setError(error.response.data.message))
        dispatch(setLoading(false))
    }
}

const handledeletechat=async(id)=>{
    try {
        dispatch(setLoading(true))
        const response=await deleteChat(id)
                dispatch(removeChat(id))
                dispatch(setMessages([]))
                dispatch(setCurrentChat(null))

        dispatch(setLoading(false))
    } catch (error) {
        // dispatch(setError(error.response.data.message))
        dispatch(setLoading(false))
    }
}

const handlegetmessages=async(id)=>{
    try {
        dispatch(setLoading(true))
        const response=await getChat(id)
        
        dispatch(setMessages(response.messages))
        console.log(response.messages)
        // Ensure we set the ID as a string, not the full chat object if populated
        const chatId = response.messages[0]?.chat;
          
        if (chatId) {
          dispatch(setCurrentChat(chatId))
        }
        dispatch(setLoading(false))
    } catch (error) {
        // dispatch(setError(error))
        dispatch(setLoading(false))
    }
}



const handlesendmessage = async (message, chatId) => {
    try {
        dispatch(setLoading(true))
        
        // Attach the local image preview to the optimistic user message.
        const displayContent = message instanceof FormData ? message.get("message") || "" : message;
        const outgoingFile = message instanceof FormData ? message.get("file") : null;
        const displayImage =
          outgoingFile instanceof File && outgoingFile.size > 0
            ? URL.createObjectURL(outgoingFile)
            : null;

        dispatch(
          addMessage({
            role: "user",
            content: displayContent,
            chat: chatId,
            image: displayImage,
            _id: "user-" + Date.now()
          })
        )
        
        // Insert empty placeholder for AI
        dispatch(
            addMessage({
                role: "ai",
                content: "",
                chat: chatId,
                _id: "ai-" + Date.now()
            })
        )
        dispatch(setStreamStarted(false))
        
        await streamMessage(
            message,
            chatId,
            (chunk) => {
                dispatch(setStreamStarted(true))
                dispatch(updateLastMessage(chunk))
            },
            (metadata) => {
                if (metadata.title && !chatId) { // Only dispatch addtitle if it's a new chat to prevent duplicates
                    dispatch(addtitle({_id: metadata.chatId, title: metadata.title}))
                    dispatch(setCurrentChat(metadata.chatId))
                }
            },
            (finalAi) => {
                dispatch(setLoading(false))
                dispatch(setStreamStarted(false))
            },
            (error) => {
                console.error(error);
                dispatch(setLoading(false))
                dispatch(setStreamStarted(false))
            },
            { stream: true } 
        )

    } catch (error) {
        // dispatch(setError(error.response.data.message))
        dispatch(setLoading(false))
        dispatch(setStreamStarted(false))
    }
}

const handlenewchat=()=>{
    dispatch(setMessages([]))
    dispatch(setCurrentChat(null))
}

return {
    handlegetallchats,
    handledeletechat,
    handlegetmessages,
    handlesendmessage,
    handlenewchat
}
}

export default useChat
