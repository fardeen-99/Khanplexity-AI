import {body,validationResult} from "express-validator";

const validate = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    next();
}

export const validateRegister = [
    body("username").notEmpty()
    .isString()
    .isLength({min:3})
    .withMessage("Username must be at least 3 characters long"),
    body("email").notEmpty()
    .isEmail().isString()
    .withMessage("Email is required"),
    body("password").notEmpty().
    isLength({min:6}).isString()
    .withMessage("Password must be at least 6 characters long"),
    validate
]

export const validateLogin = [
    body("email").notEmpty()
    .isEmail().isString()
    .withMessage("Email is required"),
    body("password").notEmpty().
    isLength({min:6}).isString()
    .withMessage("Password must be at least 6 characters long"),
    validate
]