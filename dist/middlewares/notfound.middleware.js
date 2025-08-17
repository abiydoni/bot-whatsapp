"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
const http_exception_1 = require("hono/http-exception");
const notFoundMiddleware = (c) => {
    throw new http_exception_1.HTTPException(404, {
        message: "Route not found",
    });
};
exports.notFoundMiddleware = notFoundMiddleware;
//# sourceMappingURL=notfound.middleware.js.map