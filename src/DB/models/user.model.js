import mongoose , {Schema} from "mongoose";
import { roleTypes } from "../../middlewares/auth.middleware.js";


const userSchema = new Schema( {

    userName: {
        type:String,
        require:true,
        minlength: [3, "the username must be atleast 3 characters long"],
        maxlength: [20,"the username must be atmost 3 characters long"],
        trim: true
    },

    email: {
        type:String,
        require:[true,"email is require"],
        unique: [true,"email must be unique"],
        trim:true,
        lowercase:true,
        match:/^[a-zA-Z\.]+@(gmail|outlock)(\.[a-z]{2,5})+$/
    },

    password: {
        type:String,
        require:[true, "password must be unique"],
    },

    gender: {
        type:String,
        enum:{

            values: ["male" , "female"],
            message: "gender must be male or female",
            default:"male"
        }
    },

    role: {
        type:String,

        enum: Object.values(roleTypes),
        default:roleTypes.user
    },

    confirmEmail: {
        type:Boolean,
        default:false
    },

    isDeleted: {
        type:Boolean,
        default:false
    },

    DOB:String,
    Address:String,
    phone:String,
    image:String,
    changedAt:Date
}, {timestamps:true})

const userModel = mongoose.model("user",userSchema);

export default userModel;