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
const hono_1 = require("hono");
const logger_1 = require("hono/logger");
const cors_1 = require("hono/cors");
const error_middleware_1 = require("./middlewares/error.middleware");
const notfound_middleware_1 = require("./middlewares/notfound.middleware");
const node_server_1 = require("@hono/node-server");
const env_1 = require("./env");
const session_1 = require("./controllers/session");
const whatsapp = __importStar(require("wa-multi-session"));
const message_1 = require("./controllers/message");
const message_2 = require("./webhooks/message");
const session_2 = require("./webhooks/session");
const profile_1 = require("./controllers/profile");
const serve_static_1 = require("@hono/node-server/serve-static");
const app = new hono_1.Hono();
app.use((0, logger_1.logger)((...params) => {
    params.map((e) => console.log(`${new Date().toISOString()} | ${e}`));
}));
app.use((0, cors_1.cors)());
app.onError(error_middleware_1.globalErrorMiddleware);
app.notFound(notfound_middleware_1.notFoundMiddleware);
// Health check endpoint untuk memastikan app up
app.get("/", (c) => c.json({ ok: true }));
app.use("/media/*", (0, serve_static_1.serveStatic)({ root: "./" }));
app.route("/session", (0, session_1.createSessionController)());
app.route("/message", (0, message_1.createMessageController)());
app.route("/profile", (0, profile_1.createProfileController)());
const port = env_1.env.PORT;
const hostname = process.env.HOST || "0.0.0.0";
(0, node_server_1.serve)({ fetch: app.fetch, port, hostname }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
if (env_1.env.WEBHOOK_BASE_URL) {
    const webhookProps = { baseUrl: env_1.env.WEBHOOK_BASE_URL };
    whatsapp.onMessageReceived((0, message_2.createWebhookMessage)(webhookProps));
    const webhookSession = (0, session_2.createWebhookSession)(webhookProps);
    whatsapp.onConnected((session) => {
        console.log(`session: '${session}' connected`);
        webhookSession({ session, status: "connected" });
    });
    whatsapp.onConnecting((session) => {
        console.log(`session: '${session}' connecting`);
        webhookSession({ session, status: "connecting" });
    });
    whatsapp.onDisconnected((session) => {
        console.log(`session: '${session}' disconnected`);
        webhookSession({ session, status: "disconnected" });
    });
}
else {
    whatsapp.onConnected((session) => {
        console.log(`session: '${session}' connected`);
    });
}
whatsapp.loadSessionsFromStorage();
//# sourceMappingURL=index.js.map