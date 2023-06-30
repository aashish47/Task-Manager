import TaskModel from "../models/Task";

const createTask = async (newTask: Object) => {
    const task = new TaskModel(newTask);
    return await task.save();
};

const deleteTask = async (id: string) => {
    return await TaskModel.findByIdAndDelete(id);
};

const deleteTaskByBoardId = async (boardId: string) => {
    return await TaskModel.deleteMany({ boardId });
};

const getAllTasks = async (createdBy: string) => {
    return await TaskModel.find({ createdBy });
};

const getTasksByBoardId = async (boardId: string) => {
    return await TaskModel.find({ boardId });
};

const updateTask = async (id: string, updaterQuery: object) => {
    return await TaskModel.findByIdAndUpdate(id, updaterQuery, { new: true });
};

const getTaskById = async (id: string) => {
    return await TaskModel.findById(id);
};

export default {
    createTask,
    deleteTask,
    deleteTaskByBoardId,
    getAllTasks,
    updateTask,
    getTaskById,
    getTasksByBoardId,
};
