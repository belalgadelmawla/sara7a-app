import jwt from "jsonwebtoken";
import userModel from "../DB/models/user.model.js";
import { asynHandler } from "../utils/errorHandling/asyncHandler.js";
import { verifyToken } from "../utils/token/token.js";

export const roleTypes = {
    user: "user",
    admin: "admin"
}

export const authentecation = asynHandler(async (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization) return next(new Error("authorize token is require", { cause: 401 }))
    const [bearer, token] = authorization.split(" ");

    let token_Signature = undefined;

    switch (bearer) {
        case "bearer":
            token_Signature = process.env.TOKEN_SECRET_USER
            break;

        case "admin":
            token_Signature = process.env.TOKEN_SECRET_ADMIN
            break;

        default:
            break;
    }


    const decoded = verifyToken({
        token:token,
        signature:token_Signature
    })

    const user = await userModel.findById(decoded.id);

    if (!user) return next(new Error("user is not exist", { cause: 409 }))

        if(user.changedAt?.getTime() >=  decoded.iat * 1000)
            return next(new Error("please login again",{cause:401}))

        if(user.isDeleted == true)
            return next(new Error("please login again",{cause:401}))

    req.user = user;


    return next();

})

export const allowTo = (roles = []) => {

    return async (req, res, next) => {

        if (!roles.includes(req.user.role)) return next(new Error("forbidden account", { cause: 403 }))

        return next();

    }
}