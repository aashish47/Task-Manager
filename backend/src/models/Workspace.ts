import { Document, Schema, model } from "mongoose";

interface IWorkspace extends Document {
    name: string;
    description?: string;
    createdBy: string;
    members: string[];
    admin: string;
    addMembers: (members: string[]) => void;
    setAdmin: (admin: string) => void;
}

const WorkspaceSchema: Schema<IWorkspace> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        createdBy: {
            type: String,
            required: true,
        },
        members: {
            type: [String],
            default: [],
        },
        admin: String,
    },

    { timestamps: true }
);

WorkspaceSchema.methods.addMembers = function (members: string[]) {
    this.members.push(...members);
};

WorkspaceSchema.methods.setAdmin = function (admin: string) {
    this.admin = admin;
};

const Workspace = model<IWorkspace>("Workspace", WorkspaceSchema);

export default Workspace;
