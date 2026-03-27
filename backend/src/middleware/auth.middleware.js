import jwt from 'jsonwebtoken'
import redis from '../config/cache.js'
import ErrorHandler from '../utils/ErrorHandler.js'

export const authMiddleware = async (req,res,next) => {

const token = req.cookies.token;

if(!token){
    return next(new ErrorHandler("invalid credentials", 400));
}

const istokenblacklisted = await redis.get(token)

if(istokenblacklisted){
    return next(new ErrorHandler("invalid credentials", 400));
}

let decoded;

try {
    decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = decoded;
    next();
} catch (error) {
    return next(new ErrorHandler("invalid credentials", 400));
}


}