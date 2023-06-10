import ListModel from "../models/List";

const createList = async (name: string, boardId: string, createdBy: string) => {
    const list = new ListModel({ name, boardId, createdBy });
    return await list.save();
};

const deleteList = async (id: string) => {
    return await ListModel.findByIdAndDelete(id);
};

const getAllLists = async (createdBy: string) => {
    return await ListModel.find({ createdBy });
};

const updateList = async (id: string, name: string, boardId: string) => {
    return await ListModel.findByIdAndUpdate(id, { name, boardId }, { new: true });
};

const getListById = async (id: string) => {
    return await ListModel.findById(id);
};

export default {
    createList,
    deleteList,
    getAllLists,
    updateList,
    getListById,
};
