
import mongoose,{Schema,Types,model }from "mongoose";

const messageSchema = new Schema (
    {
        content: {
            type:String,
            require:true
        },

        sender: {
            type:Types.ObjectId,
            ref:"user"

        },
        receiver: {
            type:Types.ObjectId,
            ref:"user"

        },
    },
    {
        timestamps:true
    }
)

const messageModel = mongoose.model("message",messageSchema) 

export default messageModel;