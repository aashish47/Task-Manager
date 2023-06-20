import { Model, Schema, model } from "mongoose";

export interface IInvitation extends Document {
    boardId: string;
    clientId: string;
    invitationKey: string;
}

const InvitationSchema: Schema<IInvitation> = new Schema(
    {
        boardId: {
            type: String,
            required: true,
        },
        clientId: {
            type: String,
            required: true,
        },
        invitationKey: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Invitation: Model<IInvitation> = model("Invitation", InvitationSchema);
export default Invitation;
