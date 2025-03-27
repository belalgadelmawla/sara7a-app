import coonectionDB from "./DB/connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import messageRouter from "./modules/messages/messages.controller.js";
import userRouter from "./modules/user/user.controller.js";
import globalErrorHandler from "./utils/errorHandling/globalErrorHandler.js";
import notFoundHandler from "./utils/errorHandling/notFoundHandler.js";
import cors from "cors";


const bootstrap = async (app, express) => {

    
    app.use(cors());
    await coonectionDB();

    app.use(express.json());


    // app.get("/", (req, res, next) => {
    //     return res.status(200).json({ message: "Anything!!" })
    // })

    app.use("/auth", authRouter)
    app.use("/message", messageRouter)
    app.use("/user", userRouter)

    app.all("*", notFoundHandler)

    app.use(globalErrorHandler);
}

export default bootstrap;