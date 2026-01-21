import { getMe, searchUsers } from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();

router.get("/me", getMe);
router.get("/search", searchUsers);

export default router;