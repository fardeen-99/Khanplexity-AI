import axios from'axios'

const API=axios.create({
    baseURL:"/api",
    withCredentials:true
})

export const register=async(form)=>{
    try{
        const response=await API.post("/auth/register",form)
        return response.data
    }catch(error){
        throw error
    }
}

export const login=async(form)=>{
    try{
        const response=await API.post("/auth/login",form)
        return response.data
    }catch(error){
        throw error
    }
}

export const logout=async()=>{
    try{
        const response=await API.post("/auth/logout")
        return response.data
    }catch(error){
        throw error
    }
}

export const getme=async()=>{
    try{
        const response=await API.get("/auth/getme")
        return response.data
    }catch(error){
        throw error
    }
}
export const resend=async(email)=>{
    try{
        const response=await API.post("/auth/resend",{email})
        return response.data
    }catch(error){
        throw error
    }
}