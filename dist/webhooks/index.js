"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookClient = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../env");
exports.webhookClient = axios_1.default.create({
    headers: {
        key: env_1.env.KEY,
    },
});
//# sourceMappingURL=index.js.map