import { Request, Response } from "express";
import boardService from "../services/boardService";

const createBoard = async (req: Request, res: Response) => {
    const { name, workspaceId, createdBy } = req.body;
    try {
        const newBoard = await boardService.createBoard(name, workspaceId, createdBy);
        res.json(newBoard);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBoard = async (req: Request, res: Response) => {
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

const getAllBoards = async (_req: Request, res: Response) => {
    try {
        const boards = await boardService.getAllBoards();
        res.json(boards);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const updateBoard = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, workspaceId } = req.body;
    try {
        const updatedBoard = await boardService.updateBoard(id, name, workspaceId);
        if (updatedBoard) {
            res.json(updatedBoard);
        } else {
            res.status(404).json({ error: "Board not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const getBoardById = async (req: Request, res: Response) => {
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

export default {
    createBoard,
    deleteBoard,
    getAllBoards,
    updateBoard,
    getBoardById,
};
