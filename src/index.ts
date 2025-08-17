import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { globalErrorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/notfound.middleware.js";
import { serve } from "@hono/node-server";
import { env } from "./env.js";
import { createSessionController } from "./controllers/session.js";
import * as whatsapp from "wa-multi-session";
import { createMessageController } from "./controllers/message.js";
import { CreateWebhookProps } from "./webhooks/index.js";
import { createWebhookMessage } from "./webhooks/message.js";
import { createWebhookSession } from "./webhooks/session.js";
import { createProfileController } from "./controllers/profile.js";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

app.use(
  logger((...params) => {
    params.map((e) => console.log(`${new Date().toISOString()} | ${e}`));
  })
);
app.use(cors());

app.onError(globalErrorMiddleware);
app.notFound(notFoundMiddleware);

app.use("/media/*", serveStatic({ root: "./" }));

app.route("/session", createSessionController());
app.route("/message", createMessageController());
app.route("/profile", createProfileController());

const port = env.PORT;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});

if (env.WEBHOOK_BASE_URL) {
  const webhookProps = { baseUrl: env.WEBHOOK_BASE_URL };

  whatsapp.onMessageReceived(createWebhookMessage(webhookProps));

  const webhookSession = createWebhookSession(webhookProps);

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
} else {
  whatsapp.onConnected((session) => {
    console.log(`session: '${session}' connected`);
  });
}

whatsapp.loadSessionsFromStorage();
