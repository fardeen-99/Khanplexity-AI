import { createSlice } from "@reduxjs/toolkit";

const chatSlice=createSlice({
    name:"chat",
    initialState:{
        chats:[],
        loading:false,
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
            state.chats=[...state.chats,action.payload]
        }
    }
})

export const {setChats,setLoading,setError,removeChat,setMessages,setCurrentChat,addMessage,addtitle}=chatSlice.actions
export default chatSlice.reducer