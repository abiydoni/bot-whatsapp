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
exports.createSessionController = void 0;
const whatsapp = __importStar(require("wa-multi-session"));
const hono_1 = require("hono");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const zod_1 = require("zod");
const key_middleware_1 = require("../middlewares/key.middleware");
const qrcode_1 = require("qrcode");
const http_exception_1 = require("hono/http-exception");
const createSessionController = () => {
    const app = new hono_1.Hono();
    app.get("/", (0, key_middleware_1.createKeyMiddleware)(), async (c) => {
        return c.json({
            data: whatsapp.getAllSession(),
        });
    });
    const startSessionSchema = zod_1.z.object({
        session: zod_1.z.string(),
    });
    app.post("/start", (0, key_middleware_1.createKeyMiddleware)(), (0, validation_middleware_1.requestValidator)("json", startSessionSchema), async (c) => {
        const payload = c.req.valid("json");
        const isExist = whatsapp.getSession(payload.session);
        if (isExist) {
            throw new http_exception_1.HTTPException(400, {
                message: "Session already exist",
            });
        }
        const qr = await new Promise(async (r) => {
            await whatsapp.startSession(payload.session, {
                onConnected() {
                    r(null);
                },
                onQRUpdated(qr) {
                    r(qr);
                },
            });
        });
        if (qr) {
            return c.json({
                qr: qr,
            });
        }
        return c.json({
            data: {
                message: "Connected",
            },
        });
    });
    app.get("/start", (0, key_middleware_1.createKeyMiddleware)(), (0, validation_middleware_1.requestValidator)("query", startSessionSchema), async (c) => {
        const payload = c.req.valid("query");
        const isExist = whatsapp.getSession(payload.session);
        if (isExist) {
            throw new http_exception_1.HTTPException(400, {
                message: "Session already exist",
            });
        }
        const qr = await new Promise(async (r) => {
            await whatsapp.startSession(payload.session, {
                onConnected() {
                    r(null);
                },
                onQRUpdated(qr) {
                    r(qr);
                },
            });
        });
        if (qr) {
            return c.render(`
            <div id="qrcode"></div>

            <script type="text/javascript">
                let qr = '${await (0, qrcode_1.toDataURL)(qr)}'
                let image = new Image()
                image.src = qr
                document.body.appendChild(image)
            </script>
            `);
        }
        return c.json({
            data: {
                message: "Connected",
            },
        });
    });
    app.all("/logout", (0, key_middleware_1.createKeyMiddleware)(), async (c) => {
        await whatsapp.deleteSession(c.req.query().session || (await c.req.json()).session || "");
        return c.json({
            data: "success",
        });
    });
    return app;
};
exports.createSessionController = createSessionController;
//# sourceMappingURL=session.js.map