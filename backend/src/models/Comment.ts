import { Document, Schema, Model, model } from "mongoose";

interface IComment extends Document {
    taskId: string;
    description: string;
    createdBy: string;
    likes: string[];
}

const CommentSchema: Schema<IComment> = new Schema(
    {
        taskId: {
            taskId: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
        likes: [
            {
                type: String,
            },
        ],
    },
    { timestamps: true }
);

const Comment = model<IComment>("Comment", CommentSchema);

export default Comment;
