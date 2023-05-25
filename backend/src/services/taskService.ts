import TaskModel from "../models/Task";

const createTask = async (name: string, description: string, listId: string, createdBy: string) => {
    const task = new TaskModel({ name, description, listId, createdBy });
    return await task.save();
};

const deleteTask = async (id: string) => {
    return await TaskModel.findByIdAndDelete(id);
};

const getAllTasks = async () => {
    return await TaskModel.find();
};

const updateTask = async (id: string, name: string, description: string, listId: string) => {
    return await TaskModel.findByIdAndUpdate(id, { name, description }, { new: true });
};

const getTaskById = async (id: string) => {
    return await TaskModel.findById(id);
};

export default {
    createTask,
    deleteTask,
    getAllTasks,
    updateTask,
    getTaskById,
};
