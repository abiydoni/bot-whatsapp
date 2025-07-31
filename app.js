const express = require("express");
const path = require("path");
const WhatsAppManager = require("./managers/whatsappManager");
const validateSession = require("./middleware/validateSession");
const sessionRoutes = require("./routes/sessionRoutes");
const qrRoutes = require("./routes/qrRoutes");
const messageRoutes = require("./routes/messageRoutes");
const groupRoutes = require("./routes/groupRoutes");
const connectionRoutes = require("./routes/connectionRoutes");
const disconnectRoute = require("./routes/disconnectRoute");
const botRoutes = require("./routes/botRoutes");
const session = require("express-session");
const bcrypt = require("bcrypt");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// EXPRESS INITIALIZATION
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".svg")) {
        res.setHeader("Content-Type", "image/svg+xml");
      }
    },
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// SESSION SETUP
app.use(
  session({
    secret: "whatsapp-gateway-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

// INITIALIZE WHATSAPP MANAGER
const whatsappManager = new WhatsAppManager();
const db = whatsappManager.db;

// AUTH ROUTES
const authRouter = authRoutes(whatsappManager, db);
app.use("/", authRouter);
const requireLogin = authRouter.requireLogin;
const requireAdmin = authRouter.requireAdmin;

// PROTECT MAIN ROUTES
app.use(["/", "/qr", "/connected"], requireLogin);

const PORT = process.env.PORT || 8080;

// ROUTES
app.use("/", qrRoutes(whatsappManager));
app.use("/", sessionRoutes(whatsappManager, validateSession(whatsappManager)));
app.use("/", messageRoutes(whatsappManager, validateSession(whatsappManager)));
app.use("/", groupRoutes(whatsappManager, validateSession(whatsappManager)));
app.use(
  "/",
  connectionRoutes(whatsappManager, validateSession(whatsappManager))
);
app.use(
  "/",
  disconnectRoute(whatsappManager, validateSession(whatsappManager))
);
app.use("/", botRoutes(whatsappManager));
app.use("/", userRoutes(db));

// SERVER INITIALIZATION
app.listen(PORT, async () => {
  whatsappManager.logger.info(`🚀 Server running on http://localhost:${PORT}`);
  await whatsappManager.recoverSessions();
  whatsappManager.logger.info("Session recovery completed");
});
