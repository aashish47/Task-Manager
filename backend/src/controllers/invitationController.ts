import { Request, Response } from "express";
import mongoose from "mongoose";
import { connected, io } from "../app";
import { getSender } from "../helpers/getSender";
import { CustomRequest } from "../middlewares/authenticateFirebaseToken";
import { IBoard } from "../models/Board";
import boardService from "../services/boardService";
import { addCollaborator, deleteInvitationDetails, validateInvitationKey } from "../services/invitationService";
import notificationService from "../services/notificationService";

export const sendInvitation = async (req: CustomRequest, res: Response) => {
    const user = req.user;
    const sender = await getSender(user);
    const { boardId, clients } = req.body;
    let board: IBoard | null;

    try {
        board = await boardService.getBoardById(boardId);
    } catch (error) {
        return res.status(404).json({ error: "board not found" });
    }
    const boardName = board?.name;
    const boardLink = `http://localhost:5173/b/${boardName}/${boardId}`;
    // const invitationKey = generateUniqueKey();
    let isPending = false;
    let message = "Invitation sent successfully";

    let session = null;
    try {
        session = await mongoose.startSession();
        session.startTransaction();

        for (const clientId of clients) {
            if (!clientId) {
                throw Error;
            }
            try {
                if (board) {
                    if (board.members.includes(clientId)) {
                        throw new Error("Member already exists");
                    } else {
                        board.addMember(clientId);
                        await board.save();
                    }
                }
                // await saveInvitationDetails(boardId, clientId, invitationKey);
                if (connected.has(clientId)) {
                    io.to(clientId).emit("notifications", 1);
                } else {
                    isPending = true;
                    message = "Invitation will be sent when the user is online";
                }

                await notificationService.createNotification({
                    uid: clientId,
                    sender,
                    name: boardName,
                    link: boardLink,
                    isPending,
                    type: "board",
                });
            } catch (error) {
                throw error;
            }
        }
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ message });
    } catch (error: any) {
        if (session !== null) {
            session.abortTransaction();
            session.endSession();
        }
        res.status(500).json({ error: error.message });
    }
};

export const acceptInvitation = async (req: Request, res: Response) => {
    const { invitationKey } = req.body;
    const { boardId, clientId } = await validateInvitationKey(invitationKey);
    addCollaborator(boardId, clientId);
    await deleteInvitationDetails(invitationKey);
};
