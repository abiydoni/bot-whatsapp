"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeyMiddleware = void 0;
const http_exception_1 = require("hono/http-exception");
const factory_1 = require("hono/factory");
const env_1 = require("../env");
const createKeyMiddleware = () => (0, factory_1.createMiddleware)(async (c, next) => {
    const authorization = c.req.query().key || c.req.header().key;
    if (env_1.env.KEY && (!authorization || authorization != env_1.env.KEY)) {
        throw new http_exception_1.HTTPException(401, {
            message: "Unauthorized",
        });
    }
    await next();
});
exports.createKeyMiddleware = createKeyMiddleware;
//# sourceMappingURL=key.middleware.js.map