import { Request, Response } from "express";
import boardService from "../services/boardService";
import { CustomRequest } from "../middlewares/authenticateFirebaseToken";
import mongoose from "mongoose";
import listService from "../services/listService";
import taskService from "../services/taskService";

export const createBoard = async (req: CustomRequest, res: Response) => {
    const createdBy = req.user?.uid!;
    const { name, workspaceId } = req.body;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const newBoard = await boardService.createBoard(name, workspaceId, createdBy);
        newBoard.addMember(createdBy);
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
