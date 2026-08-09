import { Router } from "express";
import { loginHandler, loginValidation } from "./login";
import { handleValidationErrors } from "../middlewares/handleValidationErrors";



const router = Router();




router.post('/login',
    loginValidation,
    handleValidationErrors,
    loginHandler);


    // router.post("/logout",logoutHandler);
export default router;