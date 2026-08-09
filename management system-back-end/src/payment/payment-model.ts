import mongoose from "mongoose";


interface IPayment {
    studentID: mongoose.Types.ObjectId,
    groupID: mongoose.Types.ObjectId,
    month: string,
    isPaid: boolean,
    paidAt: string,
    createdAt: Date,
    updatedAt: Date
}

const paymentSchema = new mongoose.Schema<IPayment>({
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    groupID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    month: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: String,
        required: function (this: IPayment) {
            return this.isPaid === true;
        }
    }
},
    {
        timestamps: true
    });

paymentSchema.index({ studentID: 1, month: 1 }, { unique: true });

export const Payment = mongoose.model<IPayment>("Payment", paymentSchema);