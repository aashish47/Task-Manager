import Workspace from "../models/Workspace";

const createWorkspace = async (name: string, description: string, createdBy: string) => {
    const workspace = new Workspace({ name, description, createdBy });
    return await workspace.save();
};

const deleteWorkspace = async (id: string) => {
    return await Workspace.findByIdAndDelete(id);
};

const getAllWorkspaces = async () => {
    return await Workspace.find();
};

const updateWorkspace = async (id: string, name: string, description: string) => {
    return await Workspace.findByIdAndUpdate(id, { name, description }, { new: true });
};

const getWorkspaceById = async (id: string) => {
    return await Workspace.findById(id);
};

export default {
    createWorkspace,
    deleteWorkspace,
    getAllWorkspaces,
    updateWorkspace,
    getWorkspaceById,
};
