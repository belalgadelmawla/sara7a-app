import { Types } from "mongoose";
import joi from "joi";
import { roleTypes } from "./auth.middleware.js";



export const validation = (schema) => {
    
    return (req,res,next) => {

        const data = { ...req.body , ...req.params , ...req.query}

        const results = schema.validate(data,{abortEarly:false})

        if(results.error) {
            const errorMessage = results.error.details.map((obj)=> obj.message);
            return next(new Error(errorMessage,{cause:400}))
        }

        return next();
    }
}

export const isValidateObjectId = (value,helper)=> {
    if(Types.ObjectId.isValid(value)) return true
    
    return helper.message("receiver must be valid object id")
    }

    export const generaFeild = {
            userName:joi.string().min(3).max(20),
            email:joi.string().email(),
            password:joi.string(),
            confirmPassword:joi.string().valid(joi.ref("password")),
            phone:joi.string(),
            role:joi.string().valid(...Object.values(roleTypes)),
            // content: Joi.string(),
            // receiver:Joi.custom(isValidateObjectId),
            // messageId:Joi.custom(isValidateObjectId),
            // flag:Joi.string().valid(...Object.values(flags)),
            
    }
