import { getMe, searchUsers, uploadAvatar } from "../controllers/user.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import express from "express";

const router = express.Router();

router.get("/me", getMe);
router.get("/search", searchUsers);
router.post("/uploadAvatar", upload.single("file"), uploadAvatar);

export default router;