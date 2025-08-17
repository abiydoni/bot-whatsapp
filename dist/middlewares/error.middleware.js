"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorMiddleware = void 0;
const http_exception_1 = require("hono/http-exception");
const errors_1 = require("../errors");
const env_1 = require("../env");
const globalErrorMiddleware = (err, c) => {
    if (err instanceof http_exception_1.HTTPException && err.message) {
        return c.json({
            message: err.message,
        }, err.status);
    }
    if (errors_1.ApplicationError.isApplicationError(err)) {
        return c.json(err.getResponseMessage(), err.code);
    }
    console.error("APP ERROR:", err);
    if (env_1.env.NODE_ENV == "PRODUCTION")
        err.message = "Something went wrong, please try again later!";
    return c.json({ message: err.message }, 500);
};
exports.globalErrorMiddleware = globalErrorMiddleware;
//# sourceMappingURL=error.middleware.js.map