import { useEffect } from "react"
import { seterror, setloading, setuser } from "../auth.slice"
import { getme, login, logout, register, resend } from "../services/auth.service"
import { useDispatch } from "react-redux"
import { useToast } from "../../../contexts/ToastContext"


export const useAuth=()=>{
    const dispatch=useDispatch()

    const handleregister=async(form)=>{

try{
    dispatch(setloading(true))
    const response=await register(form)
    dispatch(setuser(response.user))
    return response;
}catch(error){
    const message = error.response?.data?.message || error.message;
    dispatch(seterror(message))
    throw new Error(message);
}finally{
    dispatch(setloading(false))
}

    }



    const handlelogin=async(form)=>{

        try{
            dispatch(setloading(true))
            const response=await login(form)
            dispatch(setuser(response.user))
            return response;
        }catch(error){
            const message = error.response?.data?.message || error.message;
            dispatch(seterror(message))
            throw new Error(message);
        }finally{
            dispatch(setloading(false))
        }

    }

    const { showToast } = useToast();

    const handlelogout=async()=>{

        try{
            dispatch(setloading(true))
            const response=await logout()
            dispatch(setuser(null))
            showToast("Logged out successfully", "info");
        }catch(error){
            const message = error.response?.data?.message || error.message;
            dispatch(seterror(message))
            showToast(message, "error");
        }finally{
            dispatch(setloading(false))
        }

    }

    const handlegetme=async()=>{

        try{
            dispatch(setloading(true))
            const response=await getme()
            dispatch(setuser(response.user))
        }catch(error){
            dispatch(seterror(error.message))
        }finally{
            dispatch(setloading(false))
        }

    }

    const handleResend=async(email)=>{

try{
    dispatch(setloading(true))
 await resend(email)
}catch(error){
        const message = error.response?.data?.message || error.message;
    dispatch(seterror(message))
    throw new Error(message);
}finally{
    dispatch(setloading(false))
}

    }

    return{
        handleregister,
        handlelogin,
        handlelogout,
        handlegetme,
        handleResend
    }
}