import { Request, Response } from "express";
import workspaceService from "../services/workspaceService";

const createWorkspace = async (req: Request, res: Response) => {
    const { name, description, createdBy } = req.body;
    try {
        const newWorkspace = await workspaceService.createWorkspace(name, description, createdBy);
        res.json(newWorkspace);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const deleteWorkspace = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedWorkspace = await workspaceService.deleteWorkspace(id);
        if (deletedWorkspace) {
            res.json(deletedWorkspace);
        } else {
            res.status(404).json({ error: "Workspace not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const getAllWorkspaces = async (req: Request, res: Response) => {
    const createdBy = req.query.uid as string | undefined;
    try {
        const workspaces = await workspaceService.getAllWorkspaces(createdBy);
        res.json(workspaces);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const updateWorkspace = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedWorkspace = await workspaceService.updateWorkspace(id, name, description);
        if (updatedWorkspace) {
            res.json(updatedWorkspace);
        } else {
            res.status(404).json({ error: "Workspace not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const getWorkspaceById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const workspace = await workspaceService.getWorkspaceById(id);
        if (workspace) {
            res.json(workspace);
        } else {
            res.status(404).json({ error: "Workspace not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    createWorkspace,
    deleteWorkspace,
    getAllWorkspaces,
    updateWorkspace,
    getWorkspaceById,
};
