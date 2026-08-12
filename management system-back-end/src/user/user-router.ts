import { Router } from "express";
import { addTeacher, addTeacherValidation } from "./user-controllers/add-teacher";
import { handleValidationErrors } from "../middlewares/handleValidationErrors";
import { addStudentValidation, addStudent } from "./user-controllers/add-student";
import { getStudents } from "./user-controllers/get-students";
import { getStudentByID } from "./user-controllers/get-student-by-id";
import { toggleStudentStatus } from "./user-controllers/toggle-student-status";



const router = Router();


router.post("/add-student/:groupID",
    addStudentValidation,
    handleValidationErrors,
    addStudent);

router.post("/add-teacher",
    addTeacherValidation,
    handleValidationErrors,
    addTeacher);

router.get("students",
    getStudents
)

router.get("student/:id",
    getStudentByID
)

router.delete("/:id",
    toggleStudentStatus
)


export default router;