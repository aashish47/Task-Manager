import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        workspaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Board = mongoose.model("Board", boardSchema);

export default Board;
