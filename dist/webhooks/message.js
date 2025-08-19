"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebhookMessage = void 0;
const _1 = require(".");
const createWebhookMessage = (props) => async (message) => {
    if (message.key.fromMe || message.key.remoteJid?.includes("broadcast"))
        return;
    const endpoint = `${props.baseUrl}/message`;
    // Untuk stabilitas awal: nonaktifkan ekstraksi media agar webhook ringan
    const image = null;
    const video = null;
    const document = null;
    const audio = null;
    const body = {
        session: message.sessionId,
        from: message.key.remoteJid ?? null,
        message: message.message?.conversation ||
            message.message?.extendedTextMessage?.text ||
            message.message?.imageMessage?.caption ||
            message.message?.videoMessage?.caption ||
            message.message?.documentMessage?.caption ||
            message.message?.contactMessage?.displayName ||
            message.message?.locationMessage?.comment ||
            message.message?.liveLocationMessage?.caption ||
            null,
        /**
         * media message
         */
        media: {
            image,
            video,
            document,
            audio,
        },
    };
    // Debug log + fire-and-forget agar tidak menghambat event loop
    console.log(`WEBHOOK -> ${endpoint} | from=${body.from} | hasMsg=${!!body.message}`);
    _1.webhookClient.post(endpoint, body).catch((err) => {
        console.error("WEBHOOK ERROR:", err);
    });
};
exports.createWebhookMessage = createWebhookMessage;
//# sourceMappingURL=message.js.map