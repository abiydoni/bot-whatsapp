"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebhookSession = void 0;
const _1 = require(".");
const createWebhookSession = (props) => async (event) => {
    const endpoint = `${props.baseUrl}/session`;
    const body = {
        session: event.session,
        status: event.status,
    };
    _1.webhookClient.post(endpoint, body).catch(console.error);
};
exports.createWebhookSession = createWebhookSession;
//# sourceMappingURL=session.js.map