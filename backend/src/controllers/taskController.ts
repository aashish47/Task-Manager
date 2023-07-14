import { Request, Response } from "express";
import taskService from "../services/taskService";
import { CustomRequest } from "../middlewares/authenticateFirebaseToken";
import ListModel from "../models/List";
import mongoose, { Schema, Types } from "mongoose";
import Task from "../models/Task";
import listService from "../services/listService";

export const createTask = async (req: Request, res: Response) => {
    const { listId } = req.body;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const newTask = await taskService.createTask(req.body);
        const list = await ListModel.findById(listId);
        if (list) {
            list.addTask(newTask._id);
            await list.save();
        } else {
            throw new Error("List not found");
        }
        await session.commitTransaction();
        session.endSession();
        res.json(newTask);
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const deletedTask = await taskService.deleteTask(id);
        if (deletedTask) {
            const listId = deletedTask.listId;
            const list = await listService.getListById(listId);
            if (list) {
                const tasksIds = list.tasksIds.filter((taskId) => taskId !== id);
                await listService.updateList(listId, { tasksIds });
                await session.commitTransaction();
                session.endSession();
                res.json(deletedTask);
            } else {
                await session.abortTransaction();
                session.endSession();
                res.status(404).json({ error: "List not found" });
            }
        } else {
            await session.abortTransaction();
            session.endSession();
            res.status(404).json({ error: "Task not found" });
        }
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
};

export const getAllTasks = async (req: CustomRequest, res: Response) => {
    const createdBy = req.user?.uid!;
    try {
        const tasks = await taskService.getAllTasks(createdBy);
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getTasksByBoardId = async (req: Request, res: Response) => {
    const { id: boardId } = req.params;
    try {
        const lists = await taskService.getTasksByBoardId(boardId);
        res.json(lists);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { newTask } = req.body;
    console.log(newTask);
    try {
        const updatedTask = await taskService.updateTask(id, newTask);
        if (updatedTask) {
            res.json(updatedTask);
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const moveTask = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { id } = req.params;
        const { startListId, newStartList, finishListId, newFinishList } = req.body;

        await Promise.all([
            taskService.updateTask(id, { listId: finishListId }),
            listService.updateList(startListId, newStartList),
            listService.updateList(finishListId, newFinishList),
        ]);
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ success: true, message: "Task moved successfully" });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ success: false, message: "An error occurred while moving the task" });
    }
};

export const getTaskById = async (req: Request, res: Response) => {
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
