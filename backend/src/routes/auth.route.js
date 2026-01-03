import { appCallback, signIn, signOut, signUp } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { userSignInSchema, userSignUpSchema } from "../validations/user.validate.js";
import express from "express";
import passport from "passport";

const router = express.Router();

// basic authentication
router.post("/signup", validate(userSignUpSchema), signUp);
router.post("/signin", validate(userSignInSchema), signIn);
router.post("/signout", signOut);

// google authentication
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}));
router.get("/google/callback",passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }), appCallback);

// facebook authentication
router.get("/facebook", passport.authenticate("facebook", {
  scope: ["email"],
}));
router.get("/facebook/callback", passport.authenticate("facebook", {
  session: false,
  failureRedirect: "/login",
}), appCallback);

export default router;