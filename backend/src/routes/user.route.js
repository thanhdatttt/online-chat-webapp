import { getMe } from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();

router.get("/me", getMe);

export default router;