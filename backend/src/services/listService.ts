import ListModel from "../models/List";

const createList = async (newList: Object) => {
    const list = new ListModel(newList);
    return await list.save();
};

const deleteList = async (id: string) => {
    return await ListModel.findByIdAndDelete(id);
};

const deleteListByBoardId = async (boardId: string) => {
    return await ListModel.deleteMany({ boardId });
};

const deleteListByWorkspaceId = async (workspaceId: string) => {
    return await ListModel.deleteMany({ workspaceId });
};

const getAllLists = async (createdBy: string) => {
    return await ListModel.find({ createdBy });
};

const getListsByBoardId = async (boardId: string) => {
    return await ListModel.find({ boardId });
};

const updateList = async (id: string, updaterQuery: object) => {
    return await ListModel.findByIdAndUpdate(id, updaterQuery, { new: true });
};

const getListById = async (id: string) => {
    return await ListModel.findById(id);
};

export default {
    createList,
    deleteList,
    deleteListByBoardId,
    deleteListByWorkspaceId,
    getAllLists,
    updateList,
    getListById,
    getListsByBoardId,
};
