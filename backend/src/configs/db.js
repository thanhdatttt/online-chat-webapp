import { config } from "./config.js";
import mongoose from "mongoose";

// connect database
export const connectDB = async () => {
    await mongoose.connect(config.MONGO_URI)
    .then(() => {
        console.log("Database connected.");
    })
    .catch((err) => {
        console.error("Database error: ", err);
        console.log("URI loaded: ", config.MONGO_URI);
        process.exit(1);
    })
}