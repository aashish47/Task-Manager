import express from "express";
import workspaceController from "../controllers/workspaceController";

const router = express.Router();

router.get("/", workspaceController.getAllWorkspaces);

router.get("/:id", workspaceController.getWorkspaceById);

router.post("/", workspaceController.createWorkspace);

router.put("/:id", workspaceController.updateWorkspace);

router.delete("/:id", workspaceController.deleteWorkspace);

export default router;
