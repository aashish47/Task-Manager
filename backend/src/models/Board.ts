import { Document, Schema, Model, model } from "mongoose";

interface IBoard extends Document {
    name: string;
    workspaceId: Schema.Types.ObjectId;
    listsIds: Schema.Types.ObjectId[];
    createdBy: string;
}

const BoardSchema: Schema<IBoard> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        workspaceId: {
            type: Schema.Types.ObjectId,
            ref: "Workspace",
            required: true,
        },
        listsIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "List",
            },
        ],
        createdBy: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Board: Model<IBoard> = model<IBoard>("Board", BoardSchema);

export default Board;
