import { Request, Response } from "express";
import { addCollaborator, deleteInvitationDetails, generateUniqueKey, saveInvitationDetails, validateInvitationKey } from "../services/invitationService";
import { connected, io } from "../app";
import Notification from "../models/Notification";
import notificationService from "../services/notificationService";
import mongoose from "mongoose";
import Board from "../models/Board";
import boardService from "../services/boardService";
import { CustomRequest } from "../middlewares/authenticateFirebaseToken";

export const sendInvitation = async (req: CustomRequest, res: Response) => {
    const user = req.user;
    const { boardId, clientId } = req.body;
    const board = await boardService.getBoardById(boardId);
    const boardName = board?.name;
    const boardLink = `http://localhost:5173/b/${boardName}/${boardId}`;
    const invitationKey = generateUniqueKey();
    let isPending = false;
    let message = "Invitation sent successfully";
    const session = await mongoose.startSession();
    try {
        const board = await boardService.getBoardById(boardId);
        if (board && board.members.includes(clientId)) {
            session.endSession();
            return res.status(200).json({ message: "member already exist" });
        }

        session.startTransaction();
        if (board) {
            board.addMember(clientId);
            await board.save();
        }

        await saveInvitationDetails(boardId, clientId, invitationKey);
        if (connected.has(clientId)) {
            io.to(clientId).emit("notifications", 1);
        } else {
            isPending = true;
            message = "Invitation will be sent when user is online";
        }
        await notificationService.createNotification({ uid: clientId, sender: user?.name, boardName, boardLink, isPending });
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ message });
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
};

export const acceptInvitation = async (req: Request, res: Response) => {
    const { invitationKey } = req.body;
    const { boardId, clientId } = await validateInvitationKey(invitationKey);
    addCollaborator(boardId, clientId);
    await deleteInvitationDetails(invitationKey);
};
