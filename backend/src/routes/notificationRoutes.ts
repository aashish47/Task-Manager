import express from "express";
import { deleteNotification, getAllNotifications, getNotificationById } from "../controllers/notificationController";

const router = express.Router();

router.get("/", getAllNotifications);

router.get("/:id", getNotificationById);

router.delete("/:id", deleteNotification);

export default router;
