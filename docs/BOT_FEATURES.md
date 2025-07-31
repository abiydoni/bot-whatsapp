# WhatsApp Bot Features

## Overview

Fitur bot auto-reply telah diintegrasikan ke dalam aplikasi WhatsApp Gateway. Bot ini akan otomatis merespon pesan masuk berdasarkan keyword yang dikirim ke API eksternal.

## Fitur Utama

### 1. Auto-Reply System

- Bot akan merespon otomatis setiap pesan masuk
- Menggunakan API eksternal untuk mendapatkan jawaban berdasarkan keyword
- Hanya merespon pesan private (bukan grup)
- Mendukung pesan teks biasa dan extended text

### 2. Konfigurasi Fleksibel

File konfigurasi: `config/botConfig.js`

```javascript
{
  bot: {
    enabled: true,                    // Enable/disable bot
    apiUrl: 'http://botwa.appsbee.my.id/api/menu.php',
    timeout: 10000,                  // API timeout (ms)
    userAgent: 'Mozilla/5.0',
    errorMessage: '⚠️ Gagal mengambil data menu. Coba lagi nanti ya.',
    skipGroupMessages: true,          // Skip group messages
    logPrefix: '🤖 Bot:'
  }
}
```

### 3. Logging & Monitoring

- Log semua pesan masuk (dapat dinonaktifkan)
- Log auto-reply yang dikirim
- Log error saat API gagal
- Log error saat gagal kirim pesan

### 4. Error Handling

- Timeout handling untuk API calls
- Fallback message saat API gagal
- Validasi panjang pesan
- Skip pesan kosong atau terlalu panjang

## Cara Kerja

1. **Pesan Masuk**: User mengirim pesan ke WhatsApp
2. **Validasi**: Bot memvalidasi tipe pesan dan pengirim
3. **API Call**: Bot mengirim keyword ke API eksternal
4. **Response**: Bot mengirim balasan berdasarkan response API
5. **Error Handling**: Jika API gagal, kirim pesan error

## Konfigurasi

### Enable/Disable Bot

```javascript
// config/botConfig.js
bot: {
  enabled: true; // Set false untuk disable bot
}
```

### Ubah API URL

```javascript
bot: {
  apiUrl: "http://your-api-url.com/endpoint";
}
```

### Ubah Timeout

```javascript
bot: {
  timeout: 15000; // 15 detik
}
```

### Skip Group Messages

```javascript
bot: {
  skipGroupMessages: false; // Set false untuk enable di grup
}
```

## Log Format

```
🤖 Bot: Pesan dari 6281234567890@s.whatsapp.net: halo
🤖 Bot: Auto-reply sent to 6281234567890@s.whatsapp.net
🤖 Bot: Gagal akses menu.php: timeout
```

## Dependencies

- `axios`: Untuk HTTP requests ke API
- Sudah ditambahkan ke `package.json`

## Troubleshooting

### Bot tidak merespon

1. Cek `botConfig.bot.enabled = true`
2. Cek koneksi internet
3. Cek API URL berfungsi
4. Cek log error

### API timeout

1. Cek koneksi internet
2. Cek server API berfungsi
3. Increase timeout di config

### Bot merespon di grup

1. Set `botConfig.bot.skipGroupMessages = true`
