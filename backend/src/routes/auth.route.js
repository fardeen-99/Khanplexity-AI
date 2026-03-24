import { Router } from "express";
const authRouter = Router();
import {register,login,logout,verify,getme} from "../controllers/auth.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";
import {validateRegister,validateLogin} from "../validation/auth.validate.js";

authRouter.post("/register",validateRegister,register);
authRouter.post("/login",validateLogin,login);
authRouter.post("/logout",logout);
authRouter.get("/verify/:id",verify);
authRouter.get("/getme",authMiddleware,getme);

export default authRouter;