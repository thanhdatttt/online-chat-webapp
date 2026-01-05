import { getMe, test } from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();

router.get("/me", getMe);
router.get("/test", test);

export default router;