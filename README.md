# 🤖 WhatsApp Gateway dengan Bot Monitor

Aplikasi WhatsApp Gateway yang dilengkapi dengan fitur bot auto-reply dan monitoring real-time.

## 📋 **Daftar Isi**

- [Fitur Utama](#-fitur-utama)
- [Instalasi](#-instalasi)
- [Cara Menggunakan](#-cara-menggunakan)
- [Struktur Project](#-struktur-project)
- [API Endpoints](#-api-endpoints)
- [Konfigurasi Bot](#-konfigurasi-bot)
- [Troubleshooting](#-troubleshooting)

## 🚀 **Fitur Utama**

### 1. **WhatsApp Gateway**

- ✅ Multi-session WhatsApp
- ✅ QR Code scanning
- ✅ Send message ke nomor/group
- ✅ Group management
- ✅ Session monitoring

### 2. **Bot Auto-Reply**

- ✅ Auto-reply berdasarkan keyword
- ✅ Integrasi dengan API eksternal
- ✅ Enable/disable bot
- ✅ Real-time monitoring
- ✅ API testing

### 3. **Web Dashboard**

- ✅ User management
- ✅ Session monitoring
- ✅ Bot status monitoring
- ✅ Real-time updates
- ✅ Responsive design

## 📦 **Instalasi**

### **Prerequisites**

- Node.js v16+
- npm atau yarn
- Git

### **Langkah Instalasi**

1. **Clone Repository**

```bash
git clone <repository-url>
cd bot-whatsapp
```

2. **Install Dependencies**

```bash
npm install
```

3. **Konfigurasi Bot**

```bash
# Edit file config/botConfig.js
# Sesuaikan API URL dan pengaturan bot
```

4. **Jalankan Aplikasi**

```bash
npm start
```

5. **Akses Dashboard**

```
http://localhost:8080
```

## 🎯 **Cara Menggunakan**

### **1. Login Dashboard**

```
Username: admin
Password: admin123
```

### **2. Tambah Nomor WhatsApp**

1. Masuk ke dashboard utama
2. Input nomor WhatsApp (format: 08xxxx atau 628xxxx)
3. Klik "Add Number"
4. Scan QR code yang muncul
5. Tunggu status "Connected"

### **3. Akses Bot Monitor**

1. Klik icon QR code pada session yang sudah connected
2. Masuk ke halaman connected
3. Bot monitor ada di card kedua

### **4. Konfigurasi Bot**

1. **Enable Bot**: Klik tombol "Enable" (hijau)
2. **Disable Bot**: Klik tombol "Disable" (merah)
3. **Test API**: Input keyword dan klik "Test"
4. **Full Monitor**: Klik tombol "Full" untuk akses lengkap

### **5. Kirim Pesan**

1. Di halaman connected, gunakan card "Send Message"
2. Pilih tipe: WhatsApp Number atau Group
3. Input nomor/group ID
4. Tulis pesan
5. Klik tombol send

## 📁 **Struktur Project**

```
bot-whatsapp/
├── app.js                 # File utama aplikasi
├── package.json           # Dependencies
├── config/
│   └── botConfig.js      # Konfigurasi bot
├── managers/
│   ├── DatabaseManager.js # Database manager
│   └── whatsappManager.js # WhatsApp manager
├── middleware/
│   └── validateSession.js # Session validation
├── routes/
│   ├── authRoutes.js     # Authentication routes
│   ├── botRoutes.js      # Bot routes
│   ├── connectionRoutes.js # Connection routes
│   ├── groupRoutes.js    # Group routes
│   ├── messageRoutes.js  # Message routes
│   ├── qrRoutes.js       # QR routes
│   ├── sessionRoutes.js  # Session routes
│   └── userRoutes.js     # User routes
├── views/
│   ├── index.ejs         # Dashboard utama
│   ├── connected.ejs     # Halaman connected
│   ├── bot-monitor.ejs   # Bot monitor page
│   ├── login.ejs         # Login page
│   ├── qr.ejs           # QR code page
│   ├── users.ejs        # User management
│   └── partials/
│       └── topnav.ejs   # Navigation
└── public/
    ├── icons/           # Icon files
    └── js/
        └── toast.js     # Toast notifications
```

## 🔌 **API Endpoints**

### **Authentication**

- `POST /login` - Login user
- `POST /register` - Register user
- `GET /logout` - Logout user

### **Sessions**

- `GET /sessions` - Get all sessions
- `POST /sessions` - Create new session
- `DELETE /sessions/:id` - Delete session
- `POST /sessions/:id/disconnect` - Disconnect session

### **Messages**

- `POST /send-message` - Send message to number
- `POST /send-group-message` - Send message to group

### **Groups**

- `GET /groups` - Get group list

### **Bot Management**

- `GET /bot/status` - Get bot status
- `POST /bot/toggle` - Enable/disable bot
- `POST /bot/test-api` - Test bot API
- `GET /bot/logs` - Get bot logs
- `GET /bot-monitor` - Bot monitor page

### **Users**

- `GET /api/users` - Get all users
- `DELETE /users/:username` - Delete user
- `POST /users/:username/reset-password` - Reset password

## ⚙️ **Konfigurasi Bot**

### **File: `config/botConfig.js`**

```javascript
module.exports = {
  // Bot Settings
  bot: {
    enabled: true, // Enable/disable bot
    apiUrl: "http://botwa.appsbee.my.id/api/menu.php", // API URL
    timeout: 10000, // Timeout dalam ms
    userAgent: "Mozilla/5.0", // User agent
    errorMessage: "⚠️ Gagal mengambil data menu. Coba lagi nanti ya.",
    skipGroupMessages: true, // Skip group messages
    logPrefix: "🤖 Bot:", // Log prefix
  },

  // Message Processing
  message: {
    minLength: 1, // Min message length
    maxLength: 1000, // Max message length
    allowedTypes: ["conversation", "extendedTextMessage"],
    logIncoming: true, // Log incoming messages
  },

  // API Settings
  api: {
    retryAttempts: 3, // Retry attempts
    retryDelay: 2000, // Retry delay (ms)
    cacheTimeout: 300000, // Cache timeout (ms)
  },
};
```

### **Cara Mengubah Konfigurasi**

1. **Enable/Disable Bot**

```javascript
bot: {
  enabled: true,  // true = enable, false = disable
}
```

2. **Ubah API URL**

```javascript
bot: {
  apiUrl: "http://your-api-url.com/api/menu.php",
}
```

3. **Ubah Timeout**

```javascript
bot: {
  timeout: 15000,  // 15 detik
}
```

4. **Skip Group Messages**

```javascript
bot: {
  skipGroupMessages: false,  // false = reply ke group
}
```

## 🔧 **Troubleshooting**

### **1. Bot Tidak Merespon**

**Gejala**: Bot tidak auto-reply pesan masuk

**Solusi**:

1. Cek status bot di halaman connected
2. Pastikan bot enabled (status hijau)
3. Test API dengan keyword "halo"
4. Cek log di console server

**Debug Steps**:

```bash
# Cek log server
npm start

# Cek bot status
curl http://localhost:8080/bot/status

# Test API
curl -X POST http://localhost:8080/bot/test-api \
  -H "Content-Type: application/json" \
  -d '{"keyword":"halo"}'
```

### **2. Session Tidak Connected**

**Gejala**: Status session "Disconnected"

**Solusi**:

1. Klik QR code pada session
2. Scan QR code dengan WhatsApp
3. Pastikan nomor sudah terdaftar
4. Coba reconnect jika gagal

### **3. API Error**

**Gejala**: Error saat test API

**Solusi**:

1. Cek koneksi internet
2. Pastikan API URL benar
3. Cek timeout setting
4. Coba dengan keyword berbeda

### **4. Dashboard Tidak Load**

**Gejala**: Halaman dashboard kosong

**Solusi**:

1. Cek login credentials
2. Restart aplikasi
3. Cek database connection
4. Clear browser cache

## 📊 **Monitoring & Logs**

### **Real-time Monitoring**

- Dashboard auto-refresh setiap 10 detik
- Bot status refresh setiap 5 detik
- Session status real-time

### **Log Levels**

- **INFO**: Informasi umum
- **ERROR**: Error messages
- **DEBUG**: Debug information (bot debug)

### **Bot Logs**

```
🔍 Bot Debug: messages.upsert event triggered
🔍 Bot Debug: Processing message from 6281234567890@s.whatsapp.net
🔍 Bot Debug: Message text: "halo"
🔍 Bot Debug: Making API call to http://botwa.appsbee.my.id/api/menu.php
🤖 Bot: Auto-reply sent to 6281234567890@s.whatsapp.net
```

## 🎨 **UI Features**

### **Status Indicators**

- 🟢 **Green**: Connected/Enabled
- 🔴 **Red**: Disconnected/Disabled
- 🔵 **Blue**: API Status
- 🟣 **Purple**: Auto-Reply Status

### **Toast Notifications**

- ✅ **Success**: Green toast
- ❌ **Error**: Red toast
- ⏱️ **Auto-dismiss**: 3 detik

### **Responsive Design**

- 📱 **Mobile**: Stack layout
- 💻 **Desktop**: Side-by-side layout
- 📊 **Table**: Full width tables

## 🔐 **Security**

### **Authentication**

- Session-based authentication
- User roles (admin/user)
- Password hashing
- Session timeout

### **API Security**

- Session validation
- Input sanitization
- Rate limiting
- Error handling

## 📈 **Performance**

### **Optimizations**

- Connection pooling
- Caching responses
- Lazy loading
- Minified assets

### **Monitoring**

- Real-time status
- Error tracking
- Performance metrics
- Usage statistics

## 🤝 **Contributing**

### **Development Setup**

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### **Code Style**

- ESLint configuration
- Prettier formatting
- Consistent naming
- Documentation

## 📄 **License**

MIT License - see LICENSE file for details

## 📞 **Support**

### **Contact**

- Email: support@example.com
- GitHub Issues: [Repository Issues]
- Documentation: [Wiki]

### **Community**

- Discord: [Server Link]
- Telegram: [Channel Link]
- Forum: [Forum Link]

---

**🎉 Selamat menggunakan WhatsApp Gateway dengan Bot Monitor!**
