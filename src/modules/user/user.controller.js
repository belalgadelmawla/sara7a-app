import { Router } from "express";
import * as userRouter from "./user.services.js";
import * as userValidation from "./user.validate.js"
import { allowTo, authentecation } from "../../middlewares/auth.middleware.js";
import { asynHandler } from "../../utils/errorHandling/asyncHandler.js";
import { validation } from "../../middlewares/validataion.middleware.js";
const router = Router();

router.get(
    "/",
    authentecation,
    allowTo(["admin"]),
    asynHandler(userRouter.getUser)
);

router.patch("/",
    authentecation,
    allowTo(["admin","user"]),
    validation(userValidation.updateProfileSchema),
    asynHandler(userRouter.updateProfile)
)

router.patch("/changePassword",
    authentecation,
    allowTo(["admin","user"]),
    validation(userValidation.changePasswordSchema),
    asynHandler(userRouter.changePassword)
)

router.delete("/",
    authentecation,
    allowTo(["admin","user"]),
    asynHandler(userRouter.deActiveAccount)
)


export default router;