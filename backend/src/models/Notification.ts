import { Model, Schema, model } from "mongoose";

export interface INotification extends Document {
    uid: string;
    sender: string;
    boardName: string;
    boardLink: string;
    isPending: boolean;
    isRead: boolean;
}

const NotificationSchema: Schema<INotification> = new Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        sender: {
            type: String,
            required: true,
        },
        boardName: {
            type: String,
            required: true,
        },
        boardLink: {
            type: String,
            required: true,
        },
        isPending: {
            type: Boolean,
            required: true,
            default: false,
        },
        isRead: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

const Notification: Model<INotification> = model("Notification", NotificationSchema);
export default Notification;
