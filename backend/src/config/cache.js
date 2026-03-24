import {Redis} from 'ioredis'
import dotenv from "dotenv";
dotenv.config();

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
})


redis.on("connect",()=>{
    console.log("Redis connected");
})

redis.on("error",(error)=>{
    console.log(error);
})

export default redis;
