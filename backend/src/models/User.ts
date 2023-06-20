import { Model, Schema, model } from "mongoose";

export interface IUser extends Document {
    uid: string;
    socketId: string;
    displayName: string;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        displayName: {
            type: String,
            default: "",
        },
        socketId: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

const User: Model<IUser> = model<IUser>("User", UserSchema);
export default User;
