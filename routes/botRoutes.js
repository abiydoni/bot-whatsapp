const express = require("express");
const router = express.Router();

module.exports = function (whatsappManager) {
  // Get bot status
  router.get("/bot/status", (req, res) => {
    try {
      const botConfig = require("../config/botConfig");
      const sessions = Array.from(whatsappManager.clients.entries()).map(
        ([sessionId, clientData]) => ({
          sessionId,
          numberId: clientData.numberId,
          isConnected: clientData.isConnected,
          lastActivity: clientData.lastActivity,
          connectedAt: clientData.connectedAt,
          owner: clientData.owner,
        })
      );

      res.json({
        bot: {
          enabled: botConfig.bot.enabled,
          apiUrl: botConfig.bot.apiUrl,
          skipGroupMessages: botConfig.bot.skipGroupMessages,
          logPrefix: botConfig.bot.logPrefix,
        },
        sessions: sessions,
        totalSessions: sessions.length,
        connectedSessions: sessions.filter((s) => s.isConnected).length,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Enable/disable bot
  router.post("/bot/toggle", (req, res) => {
    try {
      const botConfig = require("../config/botConfig");
      const { enabled } = req.body;

      if (typeof enabled !== "boolean") {
        return res.status(400).json({ error: "enabled must be boolean" });
      }

      botConfig.bot.enabled = enabled;

      res.json({
        success: true,
        message: `Bot ${enabled ? "enabled" : "disabled"}`,
        bot: {
          enabled: botConfig.bot.enabled,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Test bot API
  router.post("/bot/test-api", async (req, res) => {
    try {
      const botConfig = require("../config/botConfig");
      const axios = require("axios");
      const { keyword } = req.body;

      if (!keyword) {
        return res.status(400).json({ error: "keyword is required" });
      }

      const response = await axios.get(
        `${botConfig.bot.apiUrl}?key=${encodeURIComponent(
          keyword.toLowerCase()
        )}`,
        {
          headers: { "User-Agent": botConfig.bot.userAgent },
          timeout: botConfig.bot.timeout,
        }
      );

      res.json({
        success: true,
        keyword: keyword,
        response: response.data,
        status: response.status,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        details: error.response?.data || "No response data",
      });
    }
  });

  // Get bot logs (last 50 lines)
  router.get("/bot/logs", (req, res) => {
    try {
      // This is a simple implementation - in production you might want to use a proper logging system
      res.json({
        message:
          "Bot logs are available in console/logs. Check server console for real-time logs.",
        note: "Debug logs are prefixed with 🔍 Bot Debug:",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Bot monitor page
  router.get("/bot-monitor", (req, res) => {
    res.render("bot-monitor");
  });

  return router;
};
