import { Router } from "express";
import * as messageRouter from "./messages.services.js";
import * as messageValidation from "../messages/messages.validate.js"
import { asynHandler } from "../../utils/errorHandling/asyncHandler.js";
import { allowTo, authentecation } from "../../middlewares/auth.middleware.js";
import { validation } from "../../middlewares/validataion.middleware.js";
const router = Router();

router.post(
    "/",
    authentecation,
    allowTo(["user"]),
    validation(messageValidation.sendMessageSchema),
    asynHandler(messageRouter.sendMessage)
    );
router.get(
    "/:messageId",
    authentecation,
    allowTo(["user"]), 
    validation(messageValidation.getSingleMessageSchema),
    asynHandler(messageRouter.getSingleMessage)
);
router.get(
    "/",
    authentecation,
    allowTo(["user"]),
    validation(messageValidation.getAllMessageSchema),
    asynHandler(messageRouter.getAllMessages)
);
router.patch(
    "/:messageId",
    authentecation,
    allowTo(["user"]),
    validation(messageValidation.updateMessageSechema),
    asynHandler(messageRouter.updateMessage)
);
router.delete(
    "/:messageId",
    authentecation,
    allowTo(["user"]),
    validation(messageValidation.deleteMessageSchema),
    asynHandler(messageRouter.deleteMessage)
);


export default router;