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
exports.createMessageController = void 0;
const hono_1 = require("hono");
const key_middleware_1 = require("../middlewares/key.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const zod_1 = require("zod");
const whatsapp = __importStar(require("wa-multi-session"));
const http_exception_1 = require("hono/http-exception");
const createMessageController = () => {
    const app = new hono_1.Hono();
    const sendMessageSchema = zod_1.z.object({
        session: zod_1.z.string(),
        to: zod_1.z.string(),
        text: zod_1.z.string(),
        is_group: zod_1.z.boolean().optional(),
    });
    app.post("/send-text", (0, key_middleware_1.createKeyMiddleware)(), (0, validation_middleware_1.requestValidator)("json", sendMessageSchema), async (c) => {
        const payload = c.req.valid("json");
        const isExist = whatsapp.getSession(payload.session);
        if (!isExist) {
            throw new http_exception_1.HTTPException(400, {
                message: "Session does not exist",
            });
        }
        await whatsapp.sendTyping({
            sessionId: payload.session,
            to: payload.to,
            duration: Math.min(5000, payload.text.length * 100),
            isGroup: payload.is_group,
        });
        const response = await whatsapp.sendTextMessage({
            sessionId: payload.session,
            to: payload.to,
            text: payload.text,
            isGroup: payload.is_group,
        });
        return c.json({
            data: response,
        });
    });
    /**
     * @deprecated
     * This endpoint is deprecated, use POST /send-text instead
     */
    app.get("/send-text", (0, key_middleware_1.createKeyMiddleware)(), (0, validation_middleware_1.requestValidator)("query", sendMessageSchema), async (c) => {
        const payload = c.req.valid("query");
        const isExist = whatsapp.getSession(payload.session);
        if (!isExist) {
            throw new http_exception_1.HTTPException(400, {
                message: "Session does not exist",
            });
        }
        const response = await whatsapp.sendTextMessage({
            sessionId: payload.session,
            to: payload.to,
            text: payload.text,
        });
        return c.json({
            data: response,
        });
    });
    app.post("/send-image", (0, key_middleware_1.createKeyMiddleware)(), (0, validation_middleware_1.requestValidator)("json", sendMessageSchema.merge(zod_1.z.object({
        image_url: zod_1.z.string(),
    }))), async (c) => {
        const payload = c.req.valid("json");
        const isExist = whatsapp.getSession(payload.session);
        if (!isExist) {
            throw new http_exception_1.HTTPException(400, {
                message: "Session does not exist",
            });
        }
        await whatsapp.sendTyping({
            sessionId: payload.session,
            to: payload.to,
            duration: Math.min(5000, payload.text.length * 100),
            isGroup: payload.is_group,
        });
        const response = await whatsapp.sendImage({
            sessionId: payload.session,
            to: payload.to,
            text: payload.text,
            media: payload.image_url,
            isGroup: payload.is_group,
        });
        return c.json({
            data: response,
        });
    });
    app.post("/send-document", (0, key_middleware_1.createKeyMiddleware)(), (0, validation_middleware_1.requestValidator)("json", sendMessageSchema.merge(zod_1.z.object({
        document_url: zod_1.z.string(),
        document_name: zod_1.z.string(),
    }))), async (c) => {
        const payload = c.req.valid("json");
        const isExist = whatsapp.getSession(payload.session);
        if (!isExist) {
            throw new http_exception_1.HTTPException(400, {
                message: "Session does not exist",
            });
        }
        await whatsapp.sendTyping({
            sessionId: payload.session,
            to: payload.to,
            duration: Math.min(5000, payload.text.length * 100),
            isGroup: payload.is_group,
        });
        const response = await whatsapp.sendDocument({
            sessionId: payload.session,
            to: payload.to,
            text: payload.text,
            media: payload.document_url,
            filename: payload.document_name,
            isGroup: payload.is_group,
        });
        return c.json({
            data: response,
        });
    });
    app.post("/send-sticker", (0, key_middleware_1.createKeyMiddleware)(), (0, validation_middleware_1.requestValidator)("json", sendMessageSchema.merge(zod_1.z.object({
        image_url: zod_1.z.string(),
    }))), async (c) => {
        const payload = c.req.valid("json");
        const isExist = whatsapp.getSession(payload.session);
        if (!isExist) {
            throw new http_exception_1.HTTPException(400, {
                message: "Session does not exist",
            });
        }
        const response = await whatsapp.sendSticker({
            sessionId: payload.session,
            to: payload.to,
            media: payload.image_url,
            isGroup: payload.is_group,
        });
        return c.json({
            data: response,
        });
    });
    return app;
};
exports.createMessageController = createMessageController;
//# sourceMappingURL=message.js.map