import { isValidateObjectId } from "../../middlewares/validataion.middleware.js";
import joi from "joi";

export const sendMessageSchema = joi.object( {
        content:joi.string().required(),
        receiver:joi.custom(isValidateObjectId).required(),

}).required();

export const getSingleMessageSchema = joi.object( {
    messageId:joi.custom(isValidateObjectId).required(),
    }).required();

    export const flags = {
        inbox:"inbox",
        outbox:"outbox"
    }

export const getAllMessageSchema = joi.object( {
    flag:joi.string().valid(...Object.values(flags)).required(),
    }).required();

export const updateMessageSechema = joi.object( {
            content: joi.string().required(),
            receiver:joi.custom(isValidateObjectId).required(),
            messageId:joi.custom(isValidateObjectId).required(),
    }).required();

    export const deleteMessageSchema = joi.object( {
        messageId:joi.custom(isValidateObjectId).required(),
}).required();

