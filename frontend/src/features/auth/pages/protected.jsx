import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
const Protected=({children})=>{

const {user,loading}=useSelector((state)=>state.auth)


if(loading){
    return(
        <div>
            <h1>loading</h1>
        </div>
    )
}

if(!user){
    return(
     <Navigate to="/login"/>
    )
}

    return children
        
}

export default Protected