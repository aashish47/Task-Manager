import { Document, Schema, Model, model } from "mongoose";

interface IBoard extends Document {
    name: string;
    workspaceId: Schema.Types.ObjectId;
    listsIds: Schema.Types.ObjectId[];
    createdBy: string;
    members: string[];
    addList: (listId: Schema.Types.ObjectId) => void;
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
        members: [
            {
                type: String,
            },
        ],
    },
    { timestamps: true }
);

BoardSchema.methods.addList = function (listId: string) {
    this.listsIds.push(listId);
};

const Board: Model<IBoard> = model<IBoard>("Board", BoardSchema);

export default Board;
