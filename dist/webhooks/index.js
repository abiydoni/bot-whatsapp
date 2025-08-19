"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookClient = void 0;
const axios_1 = __importDefault(require("axios"));
const http_1 = require("http");
const https_1 = require("https");
const env_1 = require("../env");
exports.webhookClient = axios_1.default.create({
    headers: { key: env_1.env.KEY },
    timeout: 2000, // jangan blokir loop terlalu lama
    httpAgent: new http_1.Agent({ keepAlive: true }),
    httpsAgent: new https_1.Agent({ keepAlive: true }),
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
});
//# sourceMappingURL=index.js.map