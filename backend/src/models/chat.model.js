import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({

user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
}
,
title:{
    type:String,
    required:true,
    trim:true,
}


},{
    timestamps:true
})  

const Chat = mongoose.model("Chat",chatSchema);

export default Chat;