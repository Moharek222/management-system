import { Router } from "express";
import { loginHandler } from "./login";



const router = Router();




router.post('/login',
    // loginValidation,
    // handleValidationErrors,
    loginHandler);


    // router.post("/logout",logoutHandler);
export default router;