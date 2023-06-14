import { Request, Response } from "express";
import listService from "../services/listService";
import { CustomRequest } from "../middlewares/authenticateFirebaseToken";

const createList = async (req: Request, res: Response) => {
    const { name, boardId, createdBy } = req.body;
    try {
        const newList = await listService.createList(name, boardId, createdBy);
        res.json(newList);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const deleteList = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedList = await listService.deleteList(id);
        if (deletedList) {
            res.json(deletedList);
        } else {
            res.status(404).json({ error: "List not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const getAllLists = async (req: CustomRequest, res: Response) => {
    const createdBy = req.user?.uid!;

    try {
        const lists = await listService.getAllLists(createdBy);
        res.json(lists);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const updateList = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { newList } = req.body;

    try {
        const updatedList = await listService.updateList(id, newList);
        if (updatedList) {
            res.json(updatedList);
        } else {
            res.status(404).json({ error: "List not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const getListById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const list = await listService.getListById(id);
        if (list) {
            res.json(list);
        } else {
            res.status(404).json({ error: "List not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    createList,
    deleteList,
    getAllLists,
    updateList,
    getListById,
};
