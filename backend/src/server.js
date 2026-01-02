import { config } from "./configs/config.js";
import { connectDB } from "./configs/db.js";
import authRoute from "./routes/auth.route.js";
import express from "express";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";

// set up server
const app = express();
const server = http.createServer(app);
app.use(cors({origin: config.CLIENT_URL, credentials: true}));
app.use(express.json());
app.use(cookieParser());

// routes
// public routes
app.use("/api/auth", authRoute);

// private routes

// connect database
connectDB().then( () => {
    // run server
    server.listen(config.PORT, () => {
        console.log(`Server is running on port ${config.PORT} ...`);
    })
});
