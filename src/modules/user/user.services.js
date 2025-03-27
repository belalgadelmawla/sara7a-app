import CryptoJS from "crypto-js";
import { decrypt, encrypt } from "../../utils/encryption/encryption.js";
import userModel from "../../DB/models/user.model.js";
import { compare, hash } from "../../utils/hashing/hash.js";

export const getUser =async (req, res,next) => {
    

    const {user} =req

    user.phone = decrypt({encrypted:user.phone,signature:process.env.SECRET_KEY})


        return res.status(200).json({message:"done",results:user})

}

export const updateProfile = async (req,res,next) => {

    if(req.body.phone) {
        req.body.phone = encrypt({plainText:req.body.phone,signature:process.env.SECRET_KEY})
    }

    const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {...req.body},
        {new:true,runValidators:true},
    )

    return res.status(200).json({success:true,message:"profile updated",results:{user:updatedUser}})

}

export const changePassword = async (req,res,next) => {

    const {oldPassword,password} = req.body;

    const comparePass = compare({
        plainText:oldPassword,
        hash:req.user.password
    })

    if(!comparePass) 
        return next(new Error("old password is incorrect",{cause:404}))

    const hashPass = hash({plainText:password}) 

    const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
        password:hashPass,
        changedAt:Date.now()
        },
        {new:true , runValidators:true}
    )


    return res.status(200).json({success:true,message:"password changed",results:{user:updatedUser}})

}

export const deActiveAccount = async (req,res,next) => {

    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        {
            isDeleted:true,
            changedAt:Date.now()
        },
        {
            new:true,
            runValidators:true
        }
    )

    return res.status(200).json({success:true,message:"account deactivated successfully",results:{user}})

}

