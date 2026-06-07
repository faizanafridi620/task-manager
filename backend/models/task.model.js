import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export const Task = mongoose.model("Task", taskSchema)