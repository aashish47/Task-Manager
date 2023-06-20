import express from "express";
import { createBoard, deleteBoard, getAllBoards, getBoardById, updateBoard } from "../controllers/boardController";

const router = express.Router();

router.get("/", getAllBoards);

router.get("/:id", getBoardById);

router.post("/", createBoard);

router.put("/:id", updateBoard);

router.delete("/:id", deleteBoard);

export default router;
