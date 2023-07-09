import { Document, Schema, Model, model, Date } from "mongoose";

interface ITask extends Document {
    name: string;
    description?: string;
    workspaceId: string;
    listId: string;
    boardId: string;
    createdBy: string;
    dueDate: Date;
    isCompleted: boolean;
    cover: string;
}

const TaskSchema: Schema<ITask> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        workspaceId: {
            type: String,
            ref: "Workspace",
            required: true,
        },
        boardId: {
            type: String,
            ref: "Board",
            required: true,
        },
        listId: {
            type: String,
            ref: "List",
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
        dueDate: {
            type: Date,
        },
        isCompleted: {
            type: Boolean,
        },
        cover: {
            type: String,
        },
    },
    { timestamps: true }
);

const Task = model<ITask>("Task", TaskSchema);

export default Task;
