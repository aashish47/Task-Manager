import { Schema, model } from "mongoose";

export interface INotification extends Document {
    uid: string;
    sender: string;
    name: string;
    link: string;
    isPending: boolean;
    isRead: boolean;
    type: string;
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
        name: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        isPending: {
            type: Boolean,
            required: true,
            default: true,
        },
        isRead: {
            type: Boolean,
            required: true,
            default: false,
        },
        type: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Notification = model<INotification>("Notification", NotificationSchema);
export default Notification;
