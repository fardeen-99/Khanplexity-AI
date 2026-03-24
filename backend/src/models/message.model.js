import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    chat:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Chat"
    },
    content:{
        type:String,
        required:true,
        trim:true,
    },
    role:{
        type:String,
        required:true,
        enum:["user","ai"],
    }

},{
    timestamps:true
})

const Message = mongoose.model("Message",messageSchema);

export default Message