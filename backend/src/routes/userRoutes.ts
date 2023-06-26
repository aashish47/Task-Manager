import express from "express";
import { createUser, getUserByUid, deleteUser, getAllUsers, getUserById, searchUsersByName, updateUser } from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.get("/uid/:uid", getUserByUid);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/name/:name", searchUsersByName);

export default router;
