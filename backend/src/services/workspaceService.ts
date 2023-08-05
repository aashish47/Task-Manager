import Workspace from "../models/Workspace";

const createWorkspace = async (name: string, description: string, createdBy: string) => {
    const workspace = new Workspace({ name, description, createdBy });
    return await workspace.save();
};

const deleteWorkspace = async (id: string) => {
    return await Workspace.findByIdAndDelete(id);
};

const getAllWorkspaces = async (createdBy: string) => {
    return await Workspace.find({ createdBy });
};

const getAllWorkspacesByMembers = async (createdBy: string) => {
    return await Workspace.find({ members: createdBy });
};

const updateWorkspace = async (id: string, updaterQuery: object) => {
    return await Workspace.findByIdAndUpdate(id, updaterQuery, { new: true });
};

const getWorkspaceById = async (id: string) => {
    return await Workspace.findById(id);
};

const getWorkspaceByUid = async (uid: string) => {
    return await Workspace.find({ uid });
};

export default {
    createWorkspace,
    deleteWorkspace,
    getAllWorkspaces,
    getAllWorkspacesByMembers,
    updateWorkspace,
    getWorkspaceById,
    getWorkspaceByUid,
};
