import Joi from "joi";
import { roleTypes } from "../../middlewares/auth.middleware.js";
import { generaFeild } from "../../middlewares/validataion.middleware.js";


export const registerSchema = Joi.object({
    userName:generaFeild.userName.required(),
    email:generaFeild.email.required(),
    password:generaFeild.password.required(),
    confirmPassword:generaFeild.confirmPassword.required(),
    phone:generaFeild.phone.required(),
    role:generaFeild.role,
}).required();

export const loginSchema = Joi.object({

    email:generaFeild.email.required(),
    password:generaFeild.password.required(),
}).required()