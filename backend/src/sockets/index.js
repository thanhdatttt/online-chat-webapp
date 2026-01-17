import {Server} from "socket.io";
import {config} from "../configs/config.js";
import { socketAuth } from "../middlewares/socket.middleware.js";
import chatSocket from "./chat.socket.js";
import {setIO} from "./chat.instance.js";

export const initSocket = (server) => {
    // init socket server
    const io = new Server(server, {
        cors: {
            origin: config.CLIENT_URL,
            credentials: true,
        }
    });

    // set io in singleton
    setIO(io);

    // check socket
    io.use(socketAuth);

    // list of online users {userid: socketid}
    const onlineUsers = new Map();

    // connect socket
    io.on("connection", async (socket) => {
        const user = socket.user;
        console.log(user.displayName, "online with", socket.id);

        // online 
        onlineUsers.set(user._id, socket.id);
        io.emit("online-users", Array.from(onlineUsers.keys()));

        chatSocket(io, socket, user);

        // disconnect socket
        socket.on("disconnect", () => {
            // remove user and update list online
            onlineUsers.delete(user._id);
            io.emit("online-users", Array.from(onlineUsers.keys()));

            console.log("Socket disconnected: ", socket.id);
        });
    });
}