import { Request, Response } from "express";
import boardService from "../services/boardService";
import { CustomRequest } from "../middlewares/authenticateFirebaseToken";

export const createBoard = async (req: CustomRequest, res: Response) => {
    const createdBy = req.user?.uid!;
    const { name, workspaceId } = req.body;

    try {
        const newBoard = await boardService.createBoard(name, workspaceId, createdBy);
        res.json(newBoard);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteBoard = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedBoard = await boardService.deleteBoard(id);
        if (deletedBoard) {
            res.json(deletedBoard);
        } else {
            res.status(404).json({ error: "Board not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllBoards = async (req: CustomRequest, res: Response) => {
    const createdBy = req.user?.uid!;

    try {
        const boards = await boardService.getAllBoards(createdBy);
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
