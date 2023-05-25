import { Request, Response } from "express";
import taskService from "../services/taskService";

const createTask = async (req: Request, res: Response) => {
    const { name, description, listId, createdBy } = req.body;
    try {
        const newTask = await taskService.createTask(name, description, listId, createdBy);
        res.json(newTask);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedTask = await taskService.deleteTask(id);
        if (deletedTask) {
            res.json(deletedTask);
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const getAllTasks = async (_req: Request, res: Response) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, listId } = req.body;
    try {
        const updatedTask = await taskService.updateTask(id, name, description, listId);
        if (updatedTask) {
            res.json(updatedTask);
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const getTaskById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const task = await taskService.getTaskById(id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    createTask,
    deleteTask,
    getAllTasks,
    updateTask,
    getTaskById,
};
