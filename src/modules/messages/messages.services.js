import messageModel from "../../DB/models/messages.model.js";
import userModel from "../../DB/models/user.model.js";
import { flags } from "./messages.validate.js";

export const sendMessage = async (req, res, next) => {
    const { content, receiver } = req.body;

    const user = await userModel.findById(receiver);
    if (!user) return next(new Error("user not found", { cause: 404 }))

    const message = await messageModel.create({
        content,
        receiver,
        sender: req.user._id
    })


    return res.status(200).json({ message: "message send successfully", message })
}

export const getSingleMessage = async (req, res, next) => {

    const { messageId } = req.params;
    const { user } = req

    const message = await messageModel.findById(messageId).populate([
        {
            path: "sender",
            select: "userName email -_id"
        },
        {
            path: "receiver",
            select: "userName email -_id"
        },
    ]);

    if (!message) return next(new Error("message not found", { cause: 404 }))


    if (message.receiver?.email === user.email || message.sender?.email === user.email)
        return res.status(200).json({ results: message })

    return next(new Error("unauthorized", { cause: 403 }))
}

export const getAllMessages = async (req, res, next) => {
    const { flag } = req.query


    return res.status(200).json({
        results: flag == flags.inbox ?
            await messageModel.find({ receiver: req.user._id }) :
            await messageModel.find({ sender: req.user._id })

    })
}

export const updateMessage = async (req, res, next) => {

    const { content, receiver } = req.body;
    const { messageId } = req.params;

    const message = await messageModel.findById(messageId);

    if (!message) return next(new Error("Message not found", { cause: 404 }));

    if (message.receiver.toString() == req.user._id.toString() || message.sender.toString() == req.user._id.toString())
        message.content = content;
    message.receiver = receiver;
    await message.save();
    return res.status(200).json({ results: message })


}

export const deleteMessage = async (req, res, next) => {

    const { messageId } = req.params;

    const message = await messageModel.findById(messageId);

    if (message.receiver.toString() == req.user._id.toString() || message.sender.toString() == req.user._id.toString()) {

        await messageModel.findByIdAndDelete(message);
        return res.status(200).json({ message: "message deleted" })

    } else {
        return next(new Error("unauthorized", { cause: 401 }))
    }

}
