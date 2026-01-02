import { signIn, signUp } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { userSignInSchema, userSignUpSchema } from "../validations/user.validate.js";
import express from "express";

const router = express.Router();

router.post("/signup", validate(userSignUpSchema), signUp);
router.post("/signin", validate(userSignInSchema), signIn);

export default router;