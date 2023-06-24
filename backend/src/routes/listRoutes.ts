import express from "express";
import { getAllLists, getListById, getListsByBoardId, createList, updateList, deleteList } from "../controllers/listController";
("../controllers/listController");

const router = express.Router();

router.get("/", getAllLists);

router.get("/:id", getListById);

router.get("/boards/:id", getListsByBoardId);

router.post("/", createList);

router.put("/:id", updateList);

router.delete("/:id", deleteList);

export default router;
