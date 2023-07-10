import { Request, Response } from "express";
import commentService from "../services/commentService";
import { CustomRequest } from "../middlewares/authenticateFirebaseToken";

export const createComment = async (req: CustomRequest, res: Response) => {
    try {
        const newComment = await commentService.createComment(req.body);
        res.json(newComment);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedComment = await commentService.deleteComment(id);
        if (deletedComment) {
            res.json(deletedComment);
        } else {
            res.status(404).json({ error: "Comment not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllComments = async (req: CustomRequest, res: Response) => {
    const createdBy = req.user?.uid!;

    try {
        const comments = await commentService.getAllComments();
        res.json(comments);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getCommentsByTaskId = async (req: CustomRequest, res: Response) => {
    const { id: taskId } = req.params;

    try {
        const comments = await commentService.getCommentsByTaskId(taskId);
        res.json(comments);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { newComment } = req.body;
    try {
        const updatedComment = await commentService.updateComment(id, newComment);
        if (updatedComment) {
            res.json(updatedComment);
        } else {
            res.status(404).json({ error: "Comment not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getCommentById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const comment = await commentService.getCommentById(id);
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).json({ error: "Comment not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
