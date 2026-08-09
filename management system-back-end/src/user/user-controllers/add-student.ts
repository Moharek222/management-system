import { RequestHandler } from "express";
import { Level, User } from "../user-model";
import { StatusCodes } from "http-status-codes";
import { body } from "express-validator";
import mongoose from "mongoose";


export const addStudentValidation = [
    body("name")
        .notEmpty().withMessage("Student name is required")
        .isString().withMessage("Name must be a string")
        .trim()
        .isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters"),

    body("phone")
        .notEmpty().withMessage("Phone number is required")
        .isMobilePhone("ar-EG").withMessage("Invalid Egyptian phone number format"),

    body("parentPhone")
        .optional()
        .isMobilePhone("ar-EG").withMessage("Invalid parent phone number format")
        .custom((val, { req }) => {
            if (val === req.body.phone) {
                throw new Error("Parent phone cannot be the same as student phone");
            }
            return true;
        }),

    body("level")
        .notEmpty().withMessage("Academic level is required")
        .isIn(Object.values(Level)).withMessage("Invalid academic level"),

];

interface IRequest {
    name: string;
    phone: string;
    parentPhone?: string;
    level: Level
}
interface IResponse {
    message: string,
    data?: any
}


export const addStudent: RequestHandler<{ groupID: string }, IResponse, IRequest> = async (req, res) => {
    try {

        const groupID = req.params.groupID;
        if (!mongoose.Types.ObjectId.isValid(groupID)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Invalid group ID"
            });
        }
        const { name, phone, parentPhone, level } = req.body;
        const student = await User.create({
            name,
            group: groupID,
            phone,
            parentPhone,
            level
        });
        res.status(StatusCodes.CREATED).json({
            message: "Student added successfully",
            data: student
        });
    } catch (err) {
        if ((err as any).code === 11000) {
            return res.status(400).json({
                message: "student already exists"
            });
        }
        console.error("Add Student Error:", err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error"
        });
    }
}