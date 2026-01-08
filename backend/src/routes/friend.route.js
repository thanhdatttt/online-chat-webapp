import express from "express";
import { acceptFriendRequest, addFriend, cancelFriendRequest, declineFriendRequest, getFriendRequests, getFriends } from "../controllers/friend.controller.js";

const router = express.Router();

router.get("/", getFriends);
router.get("/requests", getFriendRequests);

router.post("/requests", addFriend);
router.post("/requests/:requestId/accept", acceptFriendRequest);
router.post("/requests/:requestId/decline", declineFriendRequest);
router.post("/requests/:requestId/cancel", cancelFriendRequest);

export default router;