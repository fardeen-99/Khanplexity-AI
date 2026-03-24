import jwt from 'jsonwebtoken'
import redis from '../config/cache.js'

export const authMiddleware = async (req,res,next) => {

const token = req.cookies.token;

if(!token){
    return res.status(400).json({
        success:false,
        message:"invalid credentials"
    })
}

const istokenblacklisted = await redis.get(token)

if(istokenblacklisted){
    return res.status(400).json({
        success:false,
        message:"invalid credentials"
    })
}

let decoded;

try {
    decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = decoded;
    next();
} catch (error) {
    return res.status(400).json({
        success:false,
        message:"invalid credentials"
    })
}


}