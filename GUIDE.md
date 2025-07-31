# 📖 Panduan Lengkap WhatsApp Gateway

Panduan step-by-step untuk menggunakan WhatsApp Gateway dengan Bot Monitor.

## 🎯 **Tujuan Aplikasi**

WhatsApp Gateway adalah aplikasi yang memungkinkan:

- Mengelola multiple session WhatsApp
- Auto-reply bot berdasarkan keyword
- Monitoring real-time status bot
- Web dashboard untuk kontrol

## 🚀 **Langkah 1: Instalasi**

### **1.1 Prerequisites**

```bash
# Pastikan Node.js terinstall
node --version  # Harus v16+

# Pastikan npm terinstall
npm --version
```

### **1.2 Clone & Install**

```bash
# Clone repository
git clone <repository-url>
cd bot-whatsapp

# Install dependencies
npm install

# Jalankan aplikasi
npm start
```

### **1.3 Akses Dashboard**

```
http://localhost:8080
```

## 🔐 **Langkah 2: Login**

### **2.1 Default Credentials**

```
Username: admin
Password: admin123
```

### **2.2 Ganti Password (Opsional)**

1. Login sebagai admin
2. Klik menu "Users"
3. Klik "Reset Password" pada user admin
4. Copy password baru
5. Login ulang dengan password baru

## 📱 **Langkah 3: Tambah Nomor WhatsApp**

### **3.1 Di Dashboard Utama**

1. **Input Nomor**: Masukkan nomor WhatsApp

   - Format: `08xxxx` atau `628xxxx`
   - Contoh: `6281234567890`

2. **Klik "Add Number"**: Submit form

3. **Scan QR Code**:

   - QR code akan muncul di halaman baru
   - Buka WhatsApp di HP
   - Scan QR code dengan WhatsApp

4. **Tunggu Connected**:
   - Status akan berubah dari "Disconnected" ke "Connected"
   - Jika gagal, coba scan ulang

### **3.2 Troubleshooting QR Code**

- **QR Code Expired**: Refresh halaman dan scan ulang
- **Tidak Bisa Scan**: Pastikan WhatsApp versi terbaru
- **Connection Failed**: Cek koneksi internet

## 🤖 **Langkah 4: Konfigurasi Bot**

### **4.1 Akses Bot Monitor**

1. Klik icon QR code pada session yang sudah connected
2. Masuk ke halaman "Connected"
3. Bot monitor ada di card kedua

### **4.2 Enable Bot**

1. **Cek Status**: Pastikan bot status "Disabled" (merah)
2. **Klik "Enable"**: Tombol hijau untuk enable bot
3. **Konfirmasi**: Status berubah menjadi "Enabled" (hijau)

### **4.3 Test Bot**

1. **Input Keyword**: Masukkan keyword "halo"
2. **Klik "Test"**: Test API dengan keyword
3. **Cek Response**: Pastikan ada response dari API

### **4.4 Konfigurasi Lanjutan**

1. **Klik "Full"**: Akses halaman monitor lengkap
2. **Ubah Settings**: Sesuaikan konfigurasi bot
3. **Save Changes**: Simpan perubahan

## 💬 **Langkah 5: Kirim Pesan**

### **5.1 Send Message**

1. **Pilih Tipe**:

   - **WhatsApp Number**: Kirim ke nomor
   - **Group**: Kirim ke group

2. **Input Recipient**:

   - **Number**: `08xxxx` atau `628xxxx`
   - **Group**: Group ID dari list group

3. **Tulis Pesan**: Masukkan pesan yang akan dikirim

4. **Klik Send**: Tombol send di pojok kanan bawah

### **5.2 Group Management**

1. **Lihat Group List**: Daftar group ada di card ketiga
2. **Copy Group ID**: Klik group ID untuk copy
3. **Paste ke Recipient**: Paste group ID ke field recipient

## 🔧 **Langkah 6: Monitoring**

### **6.1 Real-time Status**

- **Dashboard**: Auto-refresh setiap 10 detik
- **Bot Status**: Auto-refresh setiap 5 detik
- **Session Status**: Real-time connection status

### **6.2 Bot Monitoring**

- **Bot Status**: Enabled/Disabled
- **API Status**: Connected sessions
- **Auto-Reply**: Active/Inactive
- **API Testing**: Test dengan keyword

### **6.3 Session Management**

- **Connected**: Session aktif
- **Disconnected**: Session tidak aktif
- **Last Activity**: Waktu terakhir aktif
- **Actions**: QR, Delete, Disconnect

## ⚙️ **Langkah 7: Konfigurasi Lanjutan**

### **7.1 Edit Bot Config**

```bash
# Edit file config/botConfig.js
nano config/botConfig.js
```

**Settings yang bisa diubah**:

```javascript
bot: {
  enabled: true,                                    // Enable/disable
  apiUrl: "http://botwa.appsbee.my.id/api/menu.php", // API URL
  timeout: 10000,                                   // Timeout (ms)
  skipGroupMessages: true,                          // Skip group
}
```

### **7.2 Restart Aplikasi**

```bash
# Stop aplikasi
Ctrl + C

# Start ulang
npm start
```

## 🛠️ **Langkah 8: Troubleshooting**

### **8.1 Bot Tidak Merespon**

**Gejala**: Bot tidak auto-reply pesan masuk

**Solusi**:

1. **Cek Status Bot**: Pastikan enabled (hijau)
2. **Test API**: Coba test dengan keyword "halo"
3. **Cek Log**: Lihat console server untuk error
4. **Restart Bot**: Disable lalu enable ulang

**Debug Commands**:

```bash
# Cek bot status
curl http://localhost:8080/bot/status

# Test API
curl -X POST http://localhost:8080/bot/test-api \
  -H "Content-Type: application/json" \
  -d '{"keyword":"halo"}'
```

### **8.2 Session Disconnected**

**Gejala**: Status session "Disconnected"

**Solusi**:

1. **Reconnect**: Klik QR code dan scan ulang
2. **Cek WhatsApp**: Pastikan WhatsApp masih login
3. **Restart Session**: Delete dan buat ulang session
4. **Cek Internet**: Pastikan koneksi stabil

### **8.3 API Error**

**Gejala**: Error saat test API

**Solusi**:

1. **Cek URL**: Pastikan API URL benar
2. **Cek Internet**: Pastikan koneksi internet
3. **Cek Timeout**: Tambah timeout jika perlu
4. **Cek Keyword**: Coba keyword berbeda

### **8.4 Dashboard Error**

**Gejala**: Halaman dashboard error

**Solusi**:

1. **Restart App**: Stop dan start ulang
2. **Clear Cache**: Clear browser cache
3. **Cek Database**: Pastikan database tidak corrupt
4. **Reinstall**: Install ulang dependencies

## 📊 **Langkah 9: Monitoring & Logs**

### **9.1 Real-time Monitoring**

- **Dashboard**: Refresh otomatis setiap 10 detik
- **Bot Status**: Refresh otomatis setiap 5 detik
- **Session Status**: Update real-time

### **9.2 Log Monitoring**

```bash
# Lihat log server
npm start

# Log yang penting:
🔍 Bot Debug: messages.upsert event triggered
🔍 Bot Debug: Processing message from 6281234567890@s.whatsapp.net
🔍 Bot Debug: Message text: "halo"
🔍 Bot Debug: Making API call to http://botwa.appsbee.my.id/api/menu.php
🤖 Bot: Auto-reply sent to 6281234567890@s.whatsapp.net
```

### **9.3 Performance Monitoring**

- **Response Time**: Waktu response API
- **Success Rate**: Persentase success
- **Error Rate**: Persentase error
- **Session Count**: Jumlah session aktif

## 🔐 **Langkah 10: Security**

### **10.1 User Management**

1. **Tambah User**: Menu Users → Register
2. **Reset Password**: Klik "Reset Password"
3. **Delete User**: Klik icon trash

### **10.2 Session Security**

- **Session Timeout**: Auto logout setelah idle
- **Password Hashing**: Password di-hash
- **Input Validation**: Validasi input user

### **10.3 API Security**

- **Session Validation**: Validasi session
- **Rate Limiting**: Batasan request
- **Error Handling**: Handling error yang aman

## 📈 **Langkah 11: Optimization**

### **11.1 Performance**

- **Connection Pooling**: Optimasi koneksi
- **Caching**: Cache response API
- **Lazy Loading**: Load komponen saat perlu

### **11.2 Monitoring**

- **Real-time Status**: Monitor status real-time
- **Error Tracking**: Track error otomatis
- **Usage Statistics**: Statistik penggunaan

## 🎯 **Langkah 12: Best Practices**

### **12.1 Bot Configuration**

- **Enable Logging**: Aktifkan log untuk debug
- **Set Timeout**: Sesuaikan timeout dengan kebutuhan
- **Test Regularly**: Test bot secara berkala

### **12.2 Session Management**

- **Monitor Sessions**: Pantau status session
- **Clean Up**: Hapus session yang tidak aktif
- **Backup Data**: Backup data secara berkala

### **12.3 Security**

- **Change Default Password**: Ganti password default
- **Regular Updates**: Update dependencies
- **Monitor Logs**: Pantau log untuk security

## 🎉 **Selamat!**

Anda telah berhasil setup dan menggunakan WhatsApp Gateway dengan Bot Monitor!

### **Checklist Selesai**:

- ✅ Instalasi aplikasi
- ✅ Login dashboard
- ✅ Tambah nomor WhatsApp
- ✅ Scan QR code
- ✅ Enable bot
- ✅ Test API
- ✅ Kirim pesan
- ✅ Monitoring status

### **Next Steps**:

- 🔧 Customize bot configuration
- 📊 Monitor performance
- 🔐 Enhance security
- 📈 Scale up jika diperlukan

---

**📞 Need Help?**

- Dokumentasi: README.md
- Issues: GitHub Issues
- Support: Contact support team
