import z from "zod";
import { userInfoRegex } from "../utils/regex.util.js";

export const userSignUpSchema = {
    body: z.object({
        username: z.string().min(3, "Username must be at least 3 characters").max(150),
        email: z.email("Email is invalid"),
        firstName: z.string().min(1, "First name is required").max(100),
        lastName: z.string().min(1, "Last name is required").max(100),
        password: z.string().min(8, "Password must be at least 8 characters").max(128).regex(userInfoRegex.password, "Password must contain uppercase, number and special character"),
    }),
}

export const userSignInSchema = {
    body: z.object({
        usernameOrEmail: z.string().min(1, "Username or email is required"),
        password: z.string().min(1, "Password is required"),
    }),
}