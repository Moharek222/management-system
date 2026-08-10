import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Level, Role, User } from "../user-model";


export const getStudents: RequestHandler<{level: Level}> = async (req, res) => {
    try {
        const { level } = req.params;
        // const filter: any = { 
        //     role: Role.STUDENT,
        // };
        // if (level) {
        //     filter.level = level;
        // }
        const students = await User.find({
            role: Role.STUDENT,
            level ,
            isActive: true
        })
        .populate("group","name level")
        .sort({ isActive: -1, name: 1 });
        res.status(StatusCodes.OK).json({
            message: "Students fetched successfully",
            data: students
        });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error"
        });
    }
}