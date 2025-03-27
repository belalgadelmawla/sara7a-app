import { EventEmitter } from "events";
import  jwt  from "jsonwebtoken";
import { subject } from "./sendemail.js";
import sendEmail from "./sendemail.js";
import { signUp } from "./generateHtml.js";
import { generateToken } from "../token/token.js";

export const emailEmitter = new EventEmitter();

emailEmitter.on("sendEmail", async (email,userName)=> {

    const token =generateToken({
        payLoad:{email},
        signature:process.env.TOKEN_SECRET_EMAIL
    })
        const link = `http://localhost:3000/auth/activate_acount/${token}`;
    
        const isSent = await sendEmail({
            to:email, 
            subject:subject.register ,
            html:signUp(link,userName)
        })
    
})