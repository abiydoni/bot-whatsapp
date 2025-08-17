"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfileController = void 0;
const whatsapp = __importStar(require("wa-multi-session"));
const hono_1 = require("hono");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const zod_1 = require("zod");
const key_middleware_1 = require("../middlewares/key.middleware");
const http_exception_1 = require("hono/http-exception");
const createProfileController = () => {
    const app = new hono_1.Hono();
    const getProfileSchema = zod_1.z.object({
        session: zod_1.z.string(),
        target: zod_1.z
            .string()
            .refine((v) => v.includes("@s.whatsapp.net") || v.includes("@g.us"), {
            message: "target must contain '@s.whatsapp.net' or '@g.us'",
        }),
    });
    app.post("/", (0, key_middleware_1.createKeyMiddleware)(), (0, validation_middleware_1.requestValidator)("json", getProfileSchema), async (c) => {
        const payload = c.req.valid("json");
        const isExist = whatsapp.getSession(payload.session);
        if (!isExist) {
            throw new http_exception_1.HTTPException(400, {
                message: "Session does not exist",
            });
        }
        const isRegistered = await whatsapp.isExist({
            sessionId: payload.session,
            to: payload.target,
            isGroup: payload.target.includes("@g.us"),
        });
        if (!isRegistered) {
            throw new http_exception_1.HTTPException(400, {
                message: "Target is not registered",
            });
        }
        return c.json({
            data: await whatsapp.getProfileInfo({
                sessionId: payload.session,
                target: payload.target,
            }),
        });
    });
    return app;
};
exports.createProfileController = createProfileController;
//# sourceMappingURL=profile.js.map