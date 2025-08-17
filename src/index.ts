import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { globalErrorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/notfound.middleware";
import { serve } from "@hono/node-server";
import { env } from "./env";
import { createSessionController } from "./controllers/session";
import * as whatsapp from "wa-multi-session";
import { createMessageController } from "./controllers/message";
import { CreateWebhookProps } from "./webhooks";
import { createWebhookMessage } from "./webhooks/message";
import { createWebhookSession } from "./webhooks/session";
import { createProfileController } from "./controllers/profile";
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
