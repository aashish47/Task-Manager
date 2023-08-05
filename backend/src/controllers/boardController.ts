import { Request, Response } from "express";
import mongoose from "mongoose";
import { connected, io } from "../app";
import { createMultipleNotifications } from "../helpers/createMultipleNotifications";
import { getSender } from "../helpers/getSender";
import { sendMultipleNotifications } from "../helpers/sendMultipleNotification";
import { CustomRequest } from "../middlewares/authenticateFirebaseToken";
import boardService from "../services/boardService";
import listService from "../services/listService";
import taskService from "../services/taskService";
import workspaceService from "../services/workspaceService";

export const createBoard = async (req: CustomRequest, res: Response) => {
    const createdBy = req.user?.uid!;
    const { name, workspaceId } = req.body;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const newBoard = await boardService.createBoard(name, workspaceId, createdBy);
        newBoard.addMembers([createdBy]);
        newBoard.setAdmin(createdBy);
        await newBoard.save();
        await session.commitTransaction();
        session.endSession();
        res.json(newBoard);
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
};

export const deleteBoard = async (req: Request, res: Response) => {
    const { id } = req.params;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const deletedBoard = await boardService.deleteBoard(id);
        await listService.deleteListByBoardId(id);
        await taskService.deleteTaskByBoardId(id);
        if (deletedBoard) {
            session.commitTransaction();
            session.endSession();
            res.json(deletedBoard);
        } else {
            session.abortTransaction();
            session.endSession();
            res.status(404).json({ error: "Board not found" });
        }
    } catch (error: any) {
        session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
};

export const getAllBoards = async (req: CustomRequest, res: Response) => {
    const userId = req.user?.uid!;

    try {
        const boards = await boardService.getAllBoards(userId);
        res.json(boards);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateBoard = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { newBoard } = req.body;
    try {
        const updatedBoard = await boardService.updateBoard(id, newBoard);
        if (updatedBoard) {
            res.json(updatedBoard);
        } else {
            res.status(404).json({ error: "Board not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getBoardById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const board = await boardService.getBoardById(id);
        if (board) {
            res.json(board);
        } else {
            res.status(404).json({ error: "Board not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateBoardMembers = async (req: CustomRequest, res: Response) => {
    const user = req.user;
    const { id: boardId } = req.params;
    const { members } = req.body;

    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const board = await boardService.getBoardById(boardId);
        if (board) {
            const { name, workspaceId } = board;
            board.addMembers(members);
            await board.save();
            const workspace = await workspaceService.getWorkspaceById(workspaceId);
            if (workspace) {
                const { members: workspaceMembers } = workspace;
                const guests: string[] = members.filter((member: string) => !workspaceMembers.includes(member));
                if (guests.length > 0) {
                    workspace.addGuests(guests);
                    await workspace.save();
                    if (workspaceMembers) {
                        workspaceMembers.map((member) => {
                            if (connected.has(member)) {
                                io.to(member).emit("invalidateWorkspaces");
                            }
                        });
                    }
                }
            } else {
                throw Error("Workspace not found");
            }
            const sender = await getSender(user);
            await createMultipleNotifications({ members, sender, id: boardId, name, type: "board" });
        } else {
            throw Error("Board not found");
        }
        await session.commitTransaction();
        session.endSession();
        await sendMultipleNotifications(members);
        res.status(200).json({ message: "Members added successfully" });
    } catch (error: any) {
        session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
};
