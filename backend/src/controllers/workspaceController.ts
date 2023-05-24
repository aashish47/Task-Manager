import { Request, Response } from "express";

const createWorkspace = () => {};

const deleteWorkspace = () => {};

const getAllWorkspaces = (req: Request, res: Response) => {
    res.json({ "msg": "hello" });
};

const updateWorkspace = () => {};

const getWorkspaceById = () => {};

export default {
    createWorkspace,
    deleteWorkspace,
    getAllWorkspaces,
    updateWorkspace,
    getWorkspaceById,
};
