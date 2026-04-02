import { createSlice } from "@reduxjs/toolkit";

const chatSlice=createSlice({
    name:"chat",
    initialState:{
        chats:[],
        loading:false,
        streamStarted:false,
        error:null,
        messages:[],
        currentChat:null
    },
    reducers:{
        setChats:(state,action)=>{
            state.chats=action.payload
        },
        removeChat:(state,action)=>{
            state.chats = state.chats.filter((chat)=>chat._id !== action.payload)
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        setError:(state,action)=>{
            state.error=action.payload
        },
        setMessages:(state,action)=>{
            state.messages=action.payload
        },
        setCurrentChat:(state,action)=>{
            state.currentChat=action.payload
        },
        addMessage:(state,action)=>{
            state.messages=[...state.messages,action.payload]
        },
        addtitle:(state,action)=>{
            state.chats=[action.payload,...state.chats]
        },
        setpreview:(state,action)=>{
            state.preview=action.payload
        },
        setStreamStarted:(state,action)=>{
            state.streamStarted=action.payload
        },
        updateLastMessage:(state,action)=>{
            if(state.messages.length > 0) {
                const lastIdx = state.messages.length - 1;
                state.messages[lastIdx].content += action.payload;
            }
        }
    }
})

export const {setChats,setLoading,setStreamStarted,setError,removeChat,setMessages,setCurrentChat,addMessage,updateLastMessage,addtitle,setpreview}=chatSlice.actions
export default chatSlice.reducer
