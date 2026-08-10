import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import userRouter from "./src/user/user-router";
import groupRouter from "./src/group/group-router";
import authRouter from "./src/auth/auth-router";
import attendanceRouter from "./src/attendance/attendance-router";
import examRouter from "./src/exam/exam-router";


dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3000;
const URI = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
mongoose
    .connect(`${URI}/${DB_NAME}`)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);

        process.exit(1);
    });

// app.use(
//     cors({
//         origin: "http://localhost:3000" ,
//         credentials: true,
//     }),
// );
app.use(cookieParser());
app.use(express.static("public"));

app.use(express.json());


app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/group",groupRouter)
app.use("/api/attendance",attendanceRouter)
app.use("/api/exam",examRouter)


// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Global Error Handler:", err);
    res.status(500).json({
        message: err.message || "Internal Server Error",
        stack: err.stack,
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
