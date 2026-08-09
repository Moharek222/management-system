import { Router } from "express";
import { addTeacher, addTeacherValidation } from "./user-controllers/add-teacher";
import { handleValidationErrors } from "../middlewares/handleValidationErrors";
import { addStudentValidation, addStudent } from "./user-controllers/add-student";



const router = Router();


router.post("/add-student/:groupID",
    addStudentValidation,
    handleValidationErrors,
    addStudent);

router.post("/add-teacher",
    addTeacherValidation,
    handleValidationErrors,
    addTeacher);


export default router;