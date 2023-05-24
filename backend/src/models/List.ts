import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        boardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board",
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const List = mongoose.model("List", listSchema);

export default List;
