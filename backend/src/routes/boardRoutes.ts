import express from "express";
import { createBoard, deleteBoard, getAllBoards, getBoardById, updateBoard, updateBoardMembers } from "../controllers/boardController";

const router = express.Router();

router.get("/", getAllBoards);

router.get("/:id", getBoardById);

router.post("/", createBoard);

router.put("/:id", updateBoard);

router.put("/:id/members", updateBoardMembers);

router.delete("/:id", deleteBoard);

export default router;
