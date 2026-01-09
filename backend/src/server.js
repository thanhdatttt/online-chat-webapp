import { config } from "./configs/config.js";
import { connectDB } from "./configs/db.js";
import { authProtect } from "./middlewares/auth.middleware.js";
import express from "express";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import passport from "./configs/passport.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import friendRoute from "./routes/friend.route.js";
import messageRoute from "./routes/message.route.js";
import chatRoute from "./routes/chat.route.js";

// set up server
const app = express();
const server = http.createServer(app);
app.use(cors({origin: config.CLIENT_URL, credentials: true}));
app.use(express.json());
app.use(cookieParser());

// routes
// public routes
app.use(passport.initialize());
app.use("/api/auth", authRoute);

// private routes
app.use(authProtect);
app.use("/api/users", userRoute);
app.use("/api/friends", friendRoute);
app.use("/api/messages", messageRoute);
app.use("/api/chats", chatRoute);

// connect database
connectDB().then( () => {
    // run server
    server.listen(config.PORT, () => {
        console.log(`Server is running on port ${config.PORT} ...`);
    })
});
