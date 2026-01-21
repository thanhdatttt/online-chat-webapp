import dotenv from "dotenv";
dotenv.config();

// get configs from environment
export const config = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    CLIENT_URL: process.env.CLIENT_URL,
    // authentication
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
    GG_CLIENT_ID: process.env.GG_CLIENT_ID,
    GG_CLIENT_SECRET: process.env.GG_CLIENT_SECRET,
    GG_CLIENT_CALLBACK: process.env.GG_CLIENT_CALLBACK,
    FB_CLIENT_ID: process.env.FB_CLIENT_ID,
    FB_CLIENT_SECRET:process.env.FB_CLIENT_SECRET,
    FB_CLIENT_CALLBACK: process.env.FB_CLIENT_CALLBACK,
    GIT_CLIENT_ID: process.env.GIT_CLIENT_ID,
    GIT_CLIENT_SECRET: process.env.GIT_CLIENT_SECRET,
    GIT_CLIENT_CALLBACK: process.env.GIT_CLIENT_CALLBACK,
    // cloudinary
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
}