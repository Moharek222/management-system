import mongoose from "mongoose";

export enum Role {
    ADMIN = "admin",
    TEACHER = "teacher",
    STUDENT = "student",
}
export enum Level {
    FIRST="first",
    SECOND="second",
    THIRD="third"
}

interface IUser extends mongoose.Document {
    name: string,
    email?: string,
    group?: mongoose.Types.ObjectId,
    password?: string,
    level: Level,
    phone: string,
    parentPhone?: string,
    role?: Role,
    isActive?: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

const userShcema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
        select: false

    },
    level: {
        type: String,
        enum: Object.values(Level),
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    parentPhone: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.STUDENT
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},{
    timestamps: true,
    versionKey: false
},
);

export const User = mongoose.model<IUser>("User", userShcema);