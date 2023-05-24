const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema(
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
    { timeStamps: true }
);

const Workspace = mongoose.model("Workspace", workspaceSchema);

export default Workspace;
