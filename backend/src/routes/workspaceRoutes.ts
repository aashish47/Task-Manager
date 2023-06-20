import express from "express";
import { createWorkspace, deleteWorkspace, getAllWorkspaces, getWorkspaceById, updateWorkspace } from "../controllers/workspaceController";

const router = express.Router();

router.get("/", getAllWorkspaces);

router.get("/:id", getWorkspaceById);

router.post("/", createWorkspace);

router.put("/:id", updateWorkspace);

router.delete("/:id", deleteWorkspace);

export default router;
