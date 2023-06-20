import express from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, moveTask, updateTask } from "../controllers/taskController";

const router = express.Router();

router.get("/", getAllTasks);

router.get("/:id", getTaskById);

router.post("/", createTask);

router.put("/:id", updateTask);

router.put("/:id/move", moveTask);

router.delete("/:id", deleteTask);

export default router;
