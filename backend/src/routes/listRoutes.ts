import express from "express";
import listController from "../controllers/listController";

const router = express.Router();

router.get("/", listController.getAllLists);

router.get("/:id", listController.getListById);

router.post("/", listController.createList);

router.put("/:id", listController.updateList);

router.delete("/:id", listController.deleteList);

export default router;
