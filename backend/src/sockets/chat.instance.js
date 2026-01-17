// manage io using singleton pattern
let io = null;

export const setIO = (serverIO) => {
    io = serverIO;
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket has not been intitialized.");
    }
    return io;
};