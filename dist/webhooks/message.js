"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebhookMessage = void 0;
const _1 = require(".");
const media_1 = require("./media");
const createWebhookMessage = (props) => async (message) => {
    if (message.key.fromMe || message.key.remoteJid?.includes("broadcast"))
        return;
    const endpoint = `${props.baseUrl}/message`;
    const image = await (0, media_1.handleWebhookImageMessage)(message);
    const video = await (0, media_1.handleWebhookVideoMessage)(message);
    const document = await (0, media_1.handleWebhookDocumentMessage)(message);
    const audio = await (0, media_1.handleWebhookAudioMessage)(message);
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
    _1.webhookClient.post(endpoint, body).catch(console.error);
};
exports.createWebhookMessage = createWebhookMessage;
//# sourceMappingURL=message.js.map