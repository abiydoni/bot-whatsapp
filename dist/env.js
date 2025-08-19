"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
// Normalize env and validate
exports.env = zod_1.z
    .object({
    NODE_ENV: zod_1.z
        .string()
        .default("DEVELOPMENT")
        .transform((v) => (v || "DEVELOPMENT").toUpperCase())
        .refine((v) => v === "DEVELOPMENT" || v === "PRODUCTION", {
        message: "Invalid NODE_ENV. Expected 'DEVELOPMENT' | 'PRODUCTION' (case-insensitive)",
    }),
    KEY: zod_1.z.string().default(""),
    PORT: zod_1.z
        .string()
        .default("5001")
        .transform((e) => Number(e)),
    WEBHOOK_BASE_URL: zod_1.z.string().optional(),
})
    .parse(process.env);
//# sourceMappingURL=env.js.map