import { Request, Response } from "express";
import mongoose from "mongoose";
import { createMultipleNotifications } from "../helpers/createMultipleNotifications";
import { getSender } from "../helpers/getSender";
import { sendMultipleNotifications } from "../helpers/sendMultipleNotification";
import { CustomRequest } from "../middlewares/authenticateFirebaseToken";
import boardService from "../services/boardService";
import listService from "../services/listService";
import taskService from "../services/taskService";
import workspaceService from "../services/workspaceService";

export const createWorkspace = async (req: CustomRequest, res: Response) => {
    const createdBy = req.user?.uid!;
    const { name, description } = req.body;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const newWorkspace = await workspaceService.createWorkspace(name, description, createdBy);
        newWorkspace.addMembers([createdBy]);
        newWorkspace.setAdmin(createdBy);
        await newWorkspace.save();
        session.commitTransaction();
        session.endSession();
        res.json(newWorkspace);
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
};

export const deleteWorkspace = async (req: Request, res: Response) => {
    const { id } = req.params;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const deletedWorkspace = await workspaceService.deleteWorkspace(id);
        await boardService.deleteBoardByWorkspaceId(id);
        await listService.deleteListByWorkspaceId(id);
        await taskService.deleteTaskByWorkspaceId(id);
        if (deletedWorkspace) {
            session.commitTransaction();
            session.endSession();
            res.json(deletedWorkspace);
        } else {
            session.abortTransaction();
            session.endSession();
            res.status(404).json({ error: "Workspace not found" });
        }
    } catch (error: any) {
        session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
};

export const getAllWorkspaces = async (req: CustomRequest, res: Response) => {
    const createdBy = req.user?.uid!;

    try {
        const workspaces = await workspaceService.getAllWorkspaces(createdBy);
        res.json(workspaces);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllWorkspacesByMembers = async (req: CustomRequest, res: Response) => {
    const createdBy = req.user?.uid!;

    try {
        const workspaces = await workspaceService.getAllWorkspacesByMembers(createdBy);
        res.json(workspaces);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateWorkspace = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { newWorkspace } = req.body;
    try {
        const updatedWorkspace = await workspaceService.updateWorkspace(id, newWorkspace);
        if (updatedWorkspace) {
            res.json(updatedWorkspace);
        } else {
            res.status(404).json({ error: "Workspace not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getWorkspaceById = async (req: Request, res: Response) => {
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

export const getWorkspaceByUid = async (req: Request, res: Response) => {
    const { uid } = req.params;
    try {
        const workspace = await workspaceService.getWorkspaceByUid(uid);
        if (workspace) {
            res.json(workspace);
        } else {
            res.status(404).json({ error: "Workspace not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateWorkspaceMembers = async (req: CustomRequest, res: Response) => {
    const user = req.user;
    const { id: workspaceId } = req.params;
    const { members } = req.body;

    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const workspace = await workspaceService.getWorkspaceById(workspaceId);
        if (workspace) {
            const { name } = workspace;
            workspace.addMembers(members);
            await workspace.save();
            const sender = await getSender(user);
            await createMultipleNotifications({ members, sender, id: workspaceId, name, type: "workspace" });
        } else {
            throw Error("Workspace not found");
        }
        await session.commitTransaction();
        session.endSession();
        await sendMultipleNotifications(members);
        res.status(200).json({ message: "Members added successfully" });
    } catch (error: any) {
        session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
};
