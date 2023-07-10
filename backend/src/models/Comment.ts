import { Document, Schema, Model, model } from "mongoose";

export interface IComment extends Document {
    taskId: string;
    description: string;
    createdBy: string;
    uid: string;
    likes: string[];
}

const CommentSchema: Schema<IComment> = new Schema(
    {
        taskId: {
            type: String,
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
        uid: {
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
