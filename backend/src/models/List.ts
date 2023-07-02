import { Document, Schema, Model, model } from "mongoose";

export interface IList extends Document {
    name: string;
    boardId: string;
    workspaceId: string;
    tasksIds: string[];
    createdBy: string;
    addTask(taskId: string): void;
}

const ListSchema: Schema<IList> = new Schema(
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
        boardId: {
            type: String,
            ref: "Board",
            required: true,
        },

        tasksIds: [
            {
                type: String,
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

const List = model<IList>("List", ListSchema);

export default List;
