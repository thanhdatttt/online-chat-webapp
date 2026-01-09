import { sendDirectMessage, sendGroupMessage } from "../controllers/message.controller.js";
import { checkBlocked, checkFriendShip } from "../middlewares/friend.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { sendDirectMessageSchema, sendGroupMessageSchema } from "../validations/message.validate.js";
import express from "express";

const router = express.Router();

router.post("/direct", validate(sendDirectMessageSchema), checkFriendShip, checkBlocked, sendDirectMessage);
router.post("/group", validate(sendGroupMessageSchema), sendGroupMessage);

export default router;