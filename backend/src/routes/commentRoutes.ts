import express from "express";
import { createComment, deleteComment, getAllComments, getCommentById, getCommentsByTaskId, updateComment } from "../controllers/commentController";

const router = express.Router();

router.get("/", getAllComments);

router.get("/:id", getCommentById);

router.get("/task/:id", getCommentsByTaskId);

router.post("/", createComment);

router.put("/:id", updateComment);

router.delete("/:id", deleteComment);

export default router;
