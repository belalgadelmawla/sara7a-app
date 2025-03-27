import userModel from "../../DB/models/user.model.js"
import { hash,compare } from "../../utils/hashing/hash.js";
import { roleTypes } from "../../middlewares/auth.middleware.js";
import { asynHandler } from "../../utils/errorHandling/asyncHandler.js";
import { emailEmitter } from "../../utils/email/emailEvent.js";
import { encrypt } from "../../utils/encryption/encryption.js";
import { generateToken, verifyToken } from "../../utils/token/token.js";

export const register = asynHandler(async (req, res, next) => {

    const { email, password, phone } = req.body;


    const checkUser = await userModel.findOne({ email })

    if (checkUser) {
        return next(new Error("user is already exist"), { cause: 409 })
    }

    const hashPaasword = hash({
        plainText:password,
        saltRound:process.env.SALT
    })

    const encryptionPhone = encrypt({plainText:phone,signature:process.env.SECRET_KEY})


    const user = await userModel.create({
        ...req.body,
        password: hashPaasword,
        phone: encryptionPhone,
    })

    emailEmitter.emit("sendEmail", user.email, user.userName)

    return res.status(201).json({ success: true, message: "user created succefully", user })


})

export const login = asynHandler(async (req, res, next) => {


    const { email } = req.body;


    const user = await userModel.findOne({ email })

    if (!user) return next(new Error("user not found"))

        if(user.confirmEmail === false)
            return next(new Error("please activate your account",{cause:400}))


    const match =compare({
        plainText:req.body.password,
        hash:user.password
    })

    if (!match) return next(new Error("incorrect password", { cause: 400 }))

    const token = generateToken({
        payLoad:{ id: user._id, isloggedIn: true },
        signature: user.role === roleTypes.user 
        ? process.env.TOKEN_SECRET_USER 
        : process.env.TOKEN_SECRET_ADMIN
    }) 

    if(user.isDeleted == true) {
        user.isDeleted = false;

        await user.save();
    }
    


    return res.status(200).json({ message: "done", token })

}
)
export const activateAccount = asynHandler(async (req, res, next) => {
    const { token } = req.params;

    const { email } =verifyToken({
        token,
        signature:process.env.TOKEN_SECRET_EMAIL
    })

    const user = await userModel.findOne({ email })

    if (!user) return next(new Error("user not found", { cause: 400 }))


    user.confirmEmail = true;

    await user.save();


    return res.status(200).json({ success: true, message: "email confirmed successfully" })



})