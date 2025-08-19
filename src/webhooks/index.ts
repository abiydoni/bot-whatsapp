import axios from "axios";
import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";
import { env } from "../env";

export type CreateWebhookProps = {
  baseUrl: string;
};

export const webhookClient = axios.create({
  headers: { key: env.KEY },
  timeout: 2000, // jangan blokir loop terlalu lama
  httpAgent: new HttpAgent({ keepAlive: true }),
  httpsAgent: new HttpsAgent({ keepAlive: true }),
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
});
