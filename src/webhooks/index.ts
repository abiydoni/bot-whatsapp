import axios from "axios";
import { env } from "../env";

export type CreateWebhookProps = {
  baseUrl: string;
};

export const webhookClient = axios.create({
  headers: { key: env.KEY },
  timeout: 2000,
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
  // proxy dinonaktifkan untuk mencegah delay bila env proxy aktif
  proxy: false,
});
