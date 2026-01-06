export const response = {
    success: (res, data = {}, message = "Success", statusCode = 200) => {
        return res.status(statusCode).json({
            message,
            ...data,
        });
    },

    error: (res, message = "Error", detail=null, statusCode = 500, field=null) => {
        return res.status(statusCode).json({
            message,
            field,
            detail,
        });
    },
} 