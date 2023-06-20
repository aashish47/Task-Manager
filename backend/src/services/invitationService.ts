import { nanoid } from "nanoid";
import Invitation, { IInvitation } from "../models/Invitation";

export const generateUniqueKey = (): string => {
    return nanoid();
};

export const saveInvitationDetails = async (boardId: string, clientId: string, invitationKey: string) => {
    const existingInvitation = await Invitation.findOne({ clientId });

    if (existingInvitation) {
        // Replace the existing entry
        await Invitation.findOneAndReplace({ clientId }, { boardId, clientId, invitationKey });
    } else {
        // Create a new entry
        const invitation = new Invitation({ boardId, clientId, invitationKey });
        await invitation.save();
    }
};
export const validateInvitationKey = async (invitationKey: string) => {
    const invitation: IInvitation | null = await Invitation.findOne({ invitationKey });

    if (!invitation) {
        throw new Error("Invalid invitation key");
    }

    return {
        boardId: invitation.boardId,
        clientId: invitation.clientId,
    };
};

export const addCollaborator = (boardId: string, cliendId: string) => {};

export const deleteInvitationDetails = async (invitationKey: string) => {
    await Invitation.deleteOne({ invitationKey });
};
