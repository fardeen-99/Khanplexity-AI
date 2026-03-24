import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    isverified:{
        type:Boolean,
        default:false,
    },
    
});

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return 
    this.password = await bcrypt.hash(this.password,10);
})


userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

const User = mongoose.model("User",userSchema);

export default User;