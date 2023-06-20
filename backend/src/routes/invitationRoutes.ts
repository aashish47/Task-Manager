import express from "express";
import { sendInvitation, acceptInvitation } from "../controllers/invitationController";
const router = express.Router();

router.post("/send", sendInvitation);

router.post("/accept", acceptInvitation);

export default router;
