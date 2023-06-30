import { Document, Schema, Model, model } from "mongoose";

export interface IBoard extends Document {
    name: string;
    workspaceId: string;
    listsIds: string[];
    createdBy: string;
    members: string[];
    admin: string;

    addList: (listId: string) => void;
    addMember: (member: string) => void;
    setAdmin: (admin: string) => void;
}

const BoardSchema: Schema<IBoard> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        workspaceId: {
            type: String,
            ref: "Workspace",
            required: true,
        },
        listsIds: [
            {
                type: String,
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
        admin: {
            type: String,
        },
    },
    { timestamps: true }
);

BoardSchema.methods.addList = function (listId: string) {
    this.listsIds.push(listId);
};

BoardSchema.methods.addMember = function (member: string) {
    this.members.push(member);
};

BoardSchema.methods.setAdmin = function (admin: string) {
    this.admin = admin;
};

const Board = model<IBoard>("Board", BoardSchema);

export default Board;
