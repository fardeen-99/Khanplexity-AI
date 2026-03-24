import { useDispatch } from "react-redux"
import { deleteChat, getAllChats, getChat, sendMessage } from "../services/chat.service"
import { setChats,setLoading,setError,removeChat,setMessages,setCurrentChat, addMessage, addtitle } from "../chat.slice"

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

        dispatch(setLoading(false))
    } catch (error) {
        dispatch(setError(error.response.data.message))
        dispatch(setLoading(false))
    }
}

const handlegetmessages=async(id)=>{
    try {
        dispatch(setLoading(true))
        const response=await getChat(id)
        console.log(response.messages)
        dispatch(setMessages(response.messages))
        dispatch(setCurrentChat(response.messages[0].chat))


        
        dispatch(setLoading(false))
    } catch (error) {
        // dispatch(setError(error))
        dispatch(setLoading(false))
    }
}

const handlesendmessage=async(message,chatId)=>{
    try {
        dispatch(setLoading(true))
        const response=await sendMessage(message,chatId)
        // Add both the user message and AI response sequentially
        dispatch(addMessage(response.user))
        dispatch(addMessage(response.ai))
 
        if(response.title){
        dispatch(addtitle({_id:response.chat,title:response.title}))
        dispatch(setCurrentChat(response.chat))
        }

        dispatch(setLoading(false))
    } catch (error) {
        // dispatch(setError(error.response.data.message))
        dispatch(setLoading(false))
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