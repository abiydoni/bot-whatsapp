# 🔧 Troubleshooting Bot WhatsApp

## Masalah: Bot Tidak Merespon

### 1. Cek Status Bot

Buka browser dan akses: `http://localhost:8080/bot-monitor`

Atau gunakan API: `http://localhost:8080/bot/status`

### 2. Cek Session WhatsApp

Pastikan ada session WhatsApp yang sudah terhubung:

```bash
# Cek di console aplikasi
# Harus ada log: "✅ WhatsApp connected for [sessionId]"
```

### 3. Cek Konfigurasi Bot

File: `config/botConfig.js`

```javascript
bot: {
  enabled: true,  // Pastikan ini true
  apiUrl: "http://botwa.appsbee.my.id/api/menu.php",
  skipGroupMessages: true,  // Bot hanya di private chat
}
```

### 4. Test API Manual

Gunakan halaman monitor atau API:

```bash
POST http://localhost:8080/bot/test-api
{
  "keyword": "halo"
}
```

### 5. Cek Logs Debug

Di console aplikasi, cari log dengan prefix:

- `🔍 Bot Debug:` - Debug info
- `🤖 Bot:` - Bot activity
- `❌ Bot:` - Bot errors

## Masalah: Bot Tidak Terdeteksi Pesan

### 1. Cek Event Handler

Pastikan event `messages.upsert` terpanggil:

```
🔍 Bot Debug: messages.upsert event triggered - type: notify, messages count: 1
```

### 2. Cek Tipe Pesan

Bot hanya merespon:

- Pesan teks biasa (`conversation`)
- Extended text (`extendedTextMessage`)
- Bukan grup (jika `skipGroupMessages: true`)

### 3. Cek Pengirim

Pastikan pesan dari nomor yang sudah terhubung:

```
🔍 Bot Debug: Processing message from 6281234567890@s.whatsapp.net
```

## Masalah: API Error

### 1. Cek Koneksi Internet

```bash
curl http://botwa.appsbee.my.id/api/menu.php?key=halo
```

### 2. Cek Timeout

Default: 10 detik. Jika lambat, increase di config:

```javascript
bot: {
  timeout: 15000; // 15 detik
}
```

### 3. Cek API Response

Log akan menampilkan:

```
🔍 Bot Debug: API response received: [response]...
```

## Masalah: Bot Merespon di Grup

### 1. Disable Group Messages

```javascript
// config/botConfig.js
bot: {
  skipGroupMessages: true; // Set false untuk enable di grup
}
```

## Masalah: Bot Tidak Kirim Reply

### 1. Cek API Response

Pastikan API mengembalikan teks yang valid:

```
🔍 Bot Debug: API response received: [response]...
🔍 Bot Debug: Sending reply to [sender]
```

### 2. Cek Empty Response

Jika API kosong, bot tidak akan kirim:

```
🔍 Bot Debug: Empty reply from API, not sending
```

## Langkah Debugging

### 1. Enable Debug Logs

Debug logs sudah aktif. Cari di console:

```
🔍 Bot Debug: [info]
```

### 2. Test Step by Step

1. **Test Session**: Pastikan WhatsApp terhubung
2. **Test API**: Gunakan `/bot/test-api`
3. **Test Message**: Kirim pesan ke WhatsApp
4. **Check Logs**: Monitor console untuk debug info

### 3. Monitor Real-time

Buka: `http://localhost:8080/bot-monitor`

- Status bot
- Sessions WhatsApp
- Test API
- Auto-refresh setiap 10 detik

## Solusi Umum

### 1. Restart Aplikasi

```bash
# Stop aplikasi
Ctrl+C

# Start ulang
npm start
```

### 2. Reset Bot Config

```javascript
// config/botConfig.js
bot: {
  enabled: true,
  apiUrl: "http://botwa.appsbee.my.id/api/menu.php",
  timeout: 10000,
  skipGroupMessages: true
}
```

### 3. Reconnect WhatsApp

1. Hapus session di folder `auth/`
2. Scan QR code ulang
3. Test bot

### 4. Check Dependencies

```bash
npm install
# Pastikan axios terinstall
```

## Monitoring

### 1. Console Logs

Monitor console untuk:

- `🔍 Bot Debug:` - Debug info
- `🤖 Bot:` - Bot activity
- `❌ Bot:` - Bot errors

### 2. Web Monitor

Akses: `http://localhost:8080/bot-monitor`

- Status real-time
- Sessions WhatsApp
- Test API
- Auto-refresh

### 3. API Endpoints

- `GET /bot/status` - Status bot
- `POST /bot/toggle` - Enable/disable bot
- `POST /bot/test-api` - Test API
- `GET /bot-monitor` - Web interface

## Contoh Log Normal

```
🔍 Bot Debug: messages.upsert event triggered - type: notify, messages count: 1
🔍 Bot Debug: Processing message from 6281234567890@s.whatsapp.net
🔍 Bot Debug: Message text: "halo"
🔍 Bot Debug: Processing keyword: "halo"
🔍 Bot Debug: Making API call to http://botwa.appsbee.my.id/api/menu.php
🔍 Bot Debug: API response received: Selamat datang!...
🔍 Bot Debug: Sending reply to 6281234567890@s.whatsapp.net
🤖 Bot: Auto-reply sent to 6281234567890@s.whatsapp.net
```

## Contoh Log Error

```
🔍 Bot Debug: messages.upsert event triggered - type: notify, messages count: 1
🔍 Bot Debug: Processing message from 6281234567890@s.whatsapp.net
🔍 Bot Debug: Making API call to http://botwa.appsbee.my.id/api/menu.php
🤖 Bot: Gagal akses menu.php: timeout
🔍 Bot Debug: Sending error message to 6281234567890@s.whatsapp.net
🤖 Bot: Gagal kirim error message: connection closed
```

## Support

Jika masih bermasalah:

1. Cek semua log debug di console
2. Test API manual
3. Pastikan WhatsApp terhubung
4. Restart aplikasi
5. Hubungi support
