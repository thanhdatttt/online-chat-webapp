export const response = {
    success: (res, data = {}, message = "Success", statusCode = 200) => {
        return res.status(statusCode).json({
            message,
            ...data,
        });
    },

    error: (res, message = "Error", detail=null,  statusCode = 500) => {
        return res.status(statusCode).json({
            message,
            detail,
        });
    },
} 