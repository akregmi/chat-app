import express from "express";
import { validSession } from "../utils/authValidation";
import { sendMessageByUserId, sendMessage, getMessages, getConversations } from "../controllers/messageController";

const router = express.Router();

router.post("/user/:userId", validSession, sendMessageByUserId)
router.post("/:conversationId", validSession, sendMessage)
router.get("/:conversationId", validSession, getMessages)
router.get("/", validSession, getConversations)

export default router;