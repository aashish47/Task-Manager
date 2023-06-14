import { Document, Schema, Model, model } from "mongoose";

export interface IList extends Document {
    name: string;
    boardId: Schema.Types.ObjectId;
    tasksIds: Schema.Types.ObjectId[];
    createdBy: string;
    addTask(taskId: Schema.Types.ObjectId): void;
}

const ListSchema: Schema<IList> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        boardId: {
            type: Schema.Types.ObjectId,
            ref: "Board",
            required: true,
        },

        tasksIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "Task",
            },
        ],
        createdBy: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

ListSchema.methods.addTask = function (taskId: string) {
    this.tasksIds.push(taskId);
};

const List: Model<IList> = model<IList>("List", ListSchema);

export default List;
