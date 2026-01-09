import { createChat, getChats, getMessages } from "../controllers/chat.controller.js";
import { checkFriendShip } from "../middlewares/friend.middleware.js";
import express from "express";

const router = express.Router();

router.post("/", checkFriendShip, createChat);
router.get("/", getChats);
router.get("/:chatId/messages", getMessages);

export default router;