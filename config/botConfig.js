module.exports = {
  // Bot Settings
  bot: {
    enabled: true,
    apiUrl: "http://botwa.appsbee.my.id/api/menu.php",
    timeout: 10000, // 10 seconds
    userAgent: "Mozilla/5.0",
    errorMessage: "⚠️ Gagal mengambil data menu. Coba lagi nanti ya.",
    skipGroupMessages: true,
    logPrefix: "🤖 Bot:",
  },

  // Message Processing
  message: {
    minLength: 1,
    maxLength: 1000,
    allowedTypes: ["conversation", "extendedTextMessage"],
    logIncoming: true,
  },

  // API Settings
  api: {
    retryAttempts: 3,
    retryDelay: 2000, // 2 seconds
    cacheTimeout: 300000, // 5 minutes
  },
};
