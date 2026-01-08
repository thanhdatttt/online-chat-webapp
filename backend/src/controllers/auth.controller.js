import { response } from "../utils/response.util.js";
import { config } from "../configs/config.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Session from "../models/Session.js";

// TTL
const ACCESS_TOKEN_TTL = "30m";
const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60 * 1000;

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

// sign up
export const signUp = async (req, res) => {
    try {
        const {username, password, email, firstName, lastName} = req.body;
        if (!username || !password || !email || !firstName || !lastName) {
            return response.error(res, "Bad request", "Missing required fields", 400);
        }

        // check username
        const checkUsername = await User.findOne({username});
        if (checkUsername) {
            return response.error(res, "Bad request", "Username is already used", 400, "username");
        }

        // check email
        const checkEmail = await User.findOne({email});
        if (checkEmail) {
            return response.error(res, "Bad request", "Email is already used", 400, "email");
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

// sign in
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
            return response.error(res, "Bad request", "Username or password is incorrect", 400);
        }

        // generate tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        await Session.create({
            userId: user._id,
            refreshToken: refreshToken,
            expiredAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
        });

        // set refresh in cookies
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: REFRESH_TOKEN_TTL,
        });

        return response.success(res, {user, accessToken, refreshToken}, "Signed in successfully", 200);
    } catch (err) {
        console.log("Error when sign in: ", err.message);
        return response.error(res, "System Error", err.message, 500);
    }
}

// sign out
export const signOut = async (req, res) => {
    try {
        // get token from cookie
        const token = req.cookies?.refreshToken;

        // clear cookie
        await Session.deleteOne({refreshToken: token});
        res.clearCookie("refreshToken");

        return response.success(res, {}, "Signed out successfully", 204);
    } catch (err) {
        console.log("Error when sign out: ", err.message);
        return response.error(res, "System Error", err.message, 500);
    }
}

// refresh token
export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken;
        if (!token) {
            return response.error(res, "Unauthorized", "No token provided", 401);
        }

        // check token in session
        const session = await Session.findOne({refreshToken: token});
        if (!session) {
            return response.error(res, "Forbidden", "Expired or invalid token", 403);
        }

        // check expiration
        if (session.expiredAt < new Date()) {
            return response.error(res, "Forbidden", "Expired token", 403);
        }

        // create new access token
        const accessToken = generateAccessToken(session.userId);
        return response.success(res, {accessToken}, "Refresh successfully", 200);
    } catch (err) {
        console.log("Error when refresh: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}

// other app authentication
export const appCallback = async (req, res) => {
    try {
        const user = req.user;

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        await Session.create({
            userId: user._id,
            refreshToken: refreshToken,
            expiredAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
        });

        // set refresh in cookies
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: REFRESH_TOKEN_TTL,
        });

        return res.redirect(
            `${config.CLIENT_URL}/oauth/success?accessToken=${encodeURIComponent(accessToken)}`
        );
        // return response.success(res, {user, accessToken, refreshToken}, "Login with third app successfully", 200);
    } catch (err) {
        console.log("Error when oauth: ", err.message);
        return response.error(res, "Oauth error", err.message, 500);
    }
}