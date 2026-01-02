import { response } from "../utils/response.util.js";
import { config } from "../configs/config.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// TTL
const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = 7 * 24 * 60 & 60 * 1000;

// generate tokens
const generateAccessToken = (userId) => {
    return jwt.sign({userId}, config.JWT_SECRET_KEY, {
        expiresIn: ACCESS_TOKEN_TTL,
    });
}
const generateRefreshToken = (userId) => {
    return jwt.sign({userId}, config.JWT_REFRESH_SECRET_KEY, {
        expiresIn: REFRESH_TOKEN_TTL,
    });
}


export const signUp = async (req, res) => {
    try {
        const {username, password, email, firstName, lastName} = req.body;
        if (!username || !password || !email || !firstName || !lastName) {
            return response.error(res, "Bad request", "Missing required fields", 400);
        }

        // check username
        const checkUsername = await User.findOne({username});
        if (checkUsername) {
            return response.error(res, "Bad request", "Username is already used", 400);
        }

        // check email
        const checkEmail = await User.findOne({email});
        if (checkEmail) {
            return response.error(res, "Bad request", "Email is already used", 400);
        }

        // create new user
        const user = await User.create({
            username,
            email,
            displayName: `${firstName} ${lastName}`,
            authProviders: [
                {
                    provider: "local",
                    providerUserId: username,
                    hashedPassword: password,
                }
            ]
        });

        return response.success(res, {user}, "Signed up successfully", 201);
    } catch (err) {
        console.log("Error when sign up: ", err.message);
        return response.error(res, "System Error", err.message, 500);
    }
}

export const signIn = async (req, res) => {
    try {
        const {usernameOrEmail, password} = req.body;
        if (!usernameOrEmail || !password) {
            return response.error(res, "Bad request", "Missing required value", 400);
        }

        // check username or email
        const user = await User.findOne({
            $or: [
                {username: usernameOrEmail},
                {email: usernameOrEmail},
            ]
        });
        if (!user) {
            return response.error(res, "Bad request", "Invalid username or email", 400);
        }

        // check local provider
        const localProvider = user.authProviders.find(
            p => p.provider === "local"
        );
        if (!localProvider) {
            return response.error(res, "Bad request", "This account does not support local login", 400);
        }

        // check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return response.error(res, "Bad request", "Password is not matched", 400);
        }

        // generate tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        user.refreshToken = refreshToken;
        await user.save();

        return response.success(res, {user, accessToken, refreshToken}, "Signed in successfully", 200);
    } catch (err) {
        console.log("Error when sign in: ", err.message);
        return response.error(res, "System Error", err.message, 500);
    }
}