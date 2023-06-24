import { Document, Schema, Model, model } from "mongoose";

interface ITask extends Document {
    name: string;
    description?: string;
    listId: Schema.Types.ObjectId;
    boardId: Schema.Types.ObjectId;
    createdBy: string;
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
        boardId: {
            type: String,
            ref: "Board",
            required: true,
        },
        listId: {
            type: Schema.Types.ObjectId,
            ref: "List",
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Task: Model<ITask> = model<ITask>("Task", TaskSchema);

export default Task;
