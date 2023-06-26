import { Document, Schema, Model, model } from "mongoose";

interface IWorkspace extends Document {
    name: string;
    description?: string;
    createdBy: string;
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
    },
    { timestamps: true }
);

const Workspace = model<IWorkspace>("Workspace", WorkspaceSchema);

export default Workspace;
