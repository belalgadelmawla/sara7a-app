import joi from "joi";
import { generaFeild } from "../../middlewares/validataion.middleware.js";

export const updateProfileSchema = joi.object( {
    userName:generaFeild.userName,
    email: generaFeild.email,
    phone: generaFeild.phone
}).required()

export const changePasswordSchema = joi.object( {
    oldPassword:generaFeild.password.required(),
    password: generaFeild.password.not(joi.ref("oldPassword")).required(),
    confirmPassword: generaFeild.confirmPassword.required()
}).required()

