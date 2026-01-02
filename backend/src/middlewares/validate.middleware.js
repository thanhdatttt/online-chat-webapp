import { response } from "../utils/response.util.js";
import { ZodError } from "zod";

// validate middleware
export const validate = (schema) => (req, res, next) => {
    try {
        if (schema.body) {
            req.body = schema.body.parse(req.body);
        }

        if (schema.query) {
            req.query = schema.query.parse(req.query);
        }

        if (schema.params) {
            req.params = schema.params.parse(req.params);
        }

        next();
    } catch (err) {
        if (err instanceof ZodError) {
            return response.error(
                res,
                "Bad request",
                err.issues.map((e) => ({
                message: e.message,
                })),
                400
            );
        }

        console.error("Validate error:", err);
        return response.error(res, "Bad request", err.message, 400);
    }
}