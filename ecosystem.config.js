module.exports = {
  apps: [
    {
      name: "wa-gateway",
      script: "dist/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "PRODUCTION",
        // Port akan diatur otomatis oleh cPanel Node.js Apps
      },
      env_production: {
        NODE_ENV: "PRODUCTION",
        // Port akan diatur otomatis oleh cPanel Node.js Apps
      },
    },
  ],
};
