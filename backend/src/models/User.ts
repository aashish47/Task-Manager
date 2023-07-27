import { Schema, model } from "mongoose";

interface IUser extends Document {
    uid: string;
    name: string;
    email: string;
    workspaces: string[];
    boards: string[];
}

const UserSchema: Schema<IUser> = new Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User = model<IUser>("User", UserSchema);

export default User;
