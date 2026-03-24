import { useEffect, useState } from "react"
import useChat from "../hooks/chat.hook"
import { useSelector } from "react-redux"

const Chat=()=>{
const [messagesend,setMessagesend]=useState("")
const {handlegetallchats,handledeletechat,handlegetmessages,handlesendmessage,handlenewchat}=useChat()

const {chats,loading,error,messages,currentChat}=useSelector((state)=>state.chat)

// useEffect(()=>{
//     console.log(messages)
// },[messages])

useEffect(()=>{
    handlegetallchats()
},[])



const handlesender=async(e)=>{
    e.preventDefault()
    console.log(messagesend,currentChat)
    await handlesendmessage(messagesend,currentChat)
    setMessagesend("")
}


    return(
        <div className=" min-h-screen w-full flex p-4 gap-4 ">
           <div className="w-1/4 bg-amber-500 rounded-2xl flex flex-col gap-2 p-2">
            <div className="flex justify-between items-center">

            <h1>khanplexity</h1>
            <button
            onClick={()=>handlenewchat()}
            className="px-3 py-1.5 rounded-xl bg-yellow-100"
            >new chat</button>
            </div>

            <div className="flex flex-col gap-3">
                {loading && <p>loading...</p>}
                {error && <p>{error}</p>}
                {chats?.map((chat)=>(
                    <div key={chat._id} className="flex justify-between items-center">
                        <p onClick={()=>handlegetmessages(chat._id)}>{chat.title}</p>
<button


className="px-3 py-2 rounded-2xl bg-red-800 text-white"
onClick={()=>handledeletechat(chat._id)}>delete</button>
                    </div>
                ))}
                {chats?.length===0 && <p>no chats found</p>}
            </div>

           </div>
           <div className="w-3/4 bg-amber-500 rounded-2xl relative">
            

            {/* chat messages */}
            <div className="flex h-[85%] overflow-y-auto flex-col gap-3 w-full ">
                {messages?.map((message)=>(
                    <div key={message._id} className="flex justify-between items-center w-full">
                        {/* {console.log(message)} */}
{message.role==="user"?(
    <p className="bg-blue-500 text-white w-fit p-2 rounded-2xl self-end">{message.content}</p>
):(
    <p className="bg-green-500 text-white w-fit p-2 rounded-2xl self-start">{message.content}</p>
)}
                        
                    </div>
                ))}
                {/* {messages?.length===0 && <p>no messages found</p>} */}

                
            </div>

            <div className="absolute bottom-2 w-full p-2 flex   gap-2">
                    <input type="text" placeholder="type your message"
                    value={messagesend}
                    onChange={(e)=>setMessagesend(e.target.value)}
                    className="w-full p-4 text-white bg-transparent border-2 border-white rounded-2xl" />
                    <button 
                    onClick={handlesender}
                    className="px-4 py-2 rounded-2xl bg-blue-500 text-white">send</button>
                </div>
           </div>
        </div>
    )
}

export default Chat