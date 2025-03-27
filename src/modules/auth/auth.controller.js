import { Router } from "express";
import * as authRouter from "./auth.services.js";
import * as authValidation from "./auth.validate.js"
import { validation } from "../../middlewares/validataion.middleware.js";

const router = Router();

router.post(
    "/register",
    validation(authValidation.registerSchema),
    authRouter.register
);
router.post(
    "/login",
    validation(authValidation.loginSchema),
    authRouter.login
);
router.get(
    "/activate_acount/:token",
    authRouter.activateAccount
);



export default router;