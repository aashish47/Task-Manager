import express from "express";
import { getAllLists, getListById, createList, updateList, deleteList } from "../controllers/listController";
("../controllers/listController");

const router = express.Router();

router.get("/", getAllLists);

router.get("/:id", getListById);

router.post("/", createList);

router.put("/:id", updateList);

router.delete("/:id", deleteList);

export default router;
