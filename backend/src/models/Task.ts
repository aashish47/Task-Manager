import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        listId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "List",
            required: true,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
