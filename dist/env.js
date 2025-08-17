"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
exports.env = zod_1.z
    .object({
    NODE_ENV: zod_1.z.enum(["DEVELOPMENT", "PRODUCTION"]).default("DEVELOPMENT"),
    KEY: zod_1.z.string().default(""),
    PORT: zod_1.z
        .string()
        .default("5001")
        .transform((e) => Number(e)),
    WEBHOOK_BASE_URL: zod_1.z.string().optional(),
})
    .parse(process.env);
//# sourceMappingURL=env.js.map