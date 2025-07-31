# 🔌 API Documentation

Dokumentasi lengkap untuk semua API endpoints WhatsApp Gateway.

## 📋 **Daftar Isi**

- [Authentication](#authentication)
- [Sessions](#sessions)
- [Messages](#messages)
- [Groups](#groups)
- [Bot Management](#bot-management)
- [Users](#users)
- [Error Handling](#error-handling)

## 🔐 **Authentication**

### **POST /login**
Login user ke sistem.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response Success:**
```json
{
  "status": "success",
  "message": "Login successful",
  "user": {
    "username": "admin",
    "role": "admin",
    "company": "Company Name"
  }
}
```

**Response Error:**
```json
{
  "status": "error",
  "message": "Invalid credentials"
}
```

### **POST /register**
Register user baru.

**Request Body:**
```json
{
  "username": "newuser",
  "password": "password123",
  "confirmPassword": "password123",
  "company": "Company Name"
}
```

**Response Success:**
```json
{
  "status": "success",
  "message": "User registered successfully"
}
```

### **GET /logout**
Logout user.

**Response:**
```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

## 📱 **Sessions**

### **GET /sessions**
Mendapatkan semua sessions.

**Response:**
```json
{
  "sessions": [
    {
      "sessionId": "session_123",
      "numberId": "6281234567890",
      "isConnected": true,
      "connectedAt": "2024-01-01T12:00:00.000Z",
      "lastActivity": "2024-01-01T12:30:00.000Z",
      "owner": "admin",
      "ownerCompany": "Company Name"
    }
  ]
}
```

### **POST /sessions**
Membuat session baru.

**Request Body:**
```json
{
  "numberId": "6281234567890"
}
```

**Response Success:**
```json
{
  "status": "success",
  "message": "Session created successfully",
  "sessionId": "session_123"
}
```

### **DELETE /sessions/:sessionId**
Menghapus session.

**Response Success:**
```json
{
  "status": "success",
  "message": "Session deleted successfully"
}
```

### **POST /sessions/:sessionId/disconnect**
Disconnect session.

**Response Success:**
```json
{
  "status": "success",
  "message": "Session disconnected successfully"
}
```

## 💬 **Messages**

### **POST /send-message**
Kirim pesan ke nomor WhatsApp.

**Headers:**
```
Content-Type: application/json
x-session-id: session_123
```

**Request Body:**
```json
{
  "phoneNumber": "6281234567890",
  "message": "Hello World!"
}
```

**Response Success:**
```json
{
  "status": "success",
  "message": "Message sent successfully"
}
```

**Response Error:**
```json
{
  "status": "error",
  "message": "Failed to send message"
}
```

### **POST /send-group-message**
Kirim pesan ke group WhatsApp.

**Headers:**
```
Content-Type: application/json
x-session-id: session_123
```

**Request Body:**
```json
{
  "groupId": "123456789-123456789@g.us",
  "message": "Hello Group!"
}
```

**Response Success:**
```json
{
  "status": "success",
  "message": "Group message sent successfully"
}
```

## 👥 **Groups**

### **GET /groups**
Mendapatkan daftar group.

**Headers:**
```
x-session-id: session_123
```

**Response Success:**
```json
{
  "status": "success",
  "groups": [
    {
      "id": "123456789-123456789@g.us",
      "name": "Group Name",
      "participants": 50
    }
  ]
}
```

**Response Error:**
```json
{
  "status": "error",
  "message": "Failed to fetch groups"
}
```

## 🤖 **Bot Management**

### **GET /bot/status**
Mendapatkan status bot.

**Response:**
```json
{
  "bot": {
    "enabled": true,
    "apiUrl": "http://botwa.appsbee.my.id/api/menu.php",
    "skipGroupMessages": true,
    "logPrefix": "🤖 Bot:"
  },
  "sessions": [
    {
      "sessionId": "session_123",
      "numberId": "6281234567890",
      "isConnected": true,
      "lastActivity": "2024-01-01T12:30:00.000Z",
      "owner": "admin"
    }
  ],
  "totalSessions": 1,
  "connectedSessions": 1
}
```

### **POST /bot/toggle**
Enable/disable bot.

**Request Body:**
```json
{
  "enabled": true
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Bot enabled",
  "bot": {
    "enabled": true
  }
}
```

### **POST /bot/test-api**
Test API bot dengan keyword.

**Request Body:**
```json
{
  "keyword": "halo"
}
```

**Response Success:**
```json
{
  "success": true,
  "keyword": "halo",
  "response": "Terima kasih, Pesan anda sudah kami terima. Ketik *menu* untuk pilihan informasi.",
  "status": 200
}
```

**Response Error:**
```json
{
  "error": "API request failed",
  "details": "Network error"
}
```

### **GET /bot/logs**
Mendapatkan log bot.

**Response:**
```json
{
  "message": "Bot logs are available in console/logs. Check server console for real-time logs.",
  "note": "Debug logs are prefixed with 🔍 Bot Debug:"
}
```

### **GET /bot-monitor**
Halaman bot monitor (HTML).

**Response:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Bot Monitor</title>
  <!-- HTML content -->
</head>
<body>
  <!-- Bot monitor interface -->
</body>
</html>
```

## 👤 **Users**

### **GET /api/users**
Mendapatkan semua users.

**Response:**
```json
{
  "users": [
    {
      "username": "admin",
      "role": "admin",
      "company": "Company Name"
    }
  ]
}
```

### **DELETE /users/:username**
Menghapus user.

**Response Success:**
```json
{
  "status": "success",
  "message": "User deleted successfully"
}
```

### **POST /users/:username/reset-password**
Reset password user.

**Response Success:**
```json
{
  "status": "success",
  "message": "Password reset successfully",
  "newPassword": "abc123def456"
}
```

## ❌ **Error Handling**

### **Error Response Format**
```json
{
  "status": "error",
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

### **Common Error Codes**

#### **400 Bad Request**
```json
{
  "status": "error",
  "message": "Invalid request body",
  "code": "INVALID_REQUEST"
}
```

#### **401 Unauthorized**
```json
{
  "status": "error",
  "message": "Unauthorized access",
  "code": "UNAUTHORIZED"
}
```

#### **404 Not Found**
```json
{
  "status": "error",
  "message": "Session not found",
  "code": "SESSION_NOT_FOUND"
}
```

#### **500 Internal Server Error**
```json
{
  "status": "error",
  "message": "Internal server error",
  "code": "INTERNAL_ERROR"
}
```

## 🔧 **Curl Examples**

### **Login**
```bash
curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

### **Create Session**
```bash
curl -X POST http://localhost:8080/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "numberId": "6281234567890"
  }'
```

### **Send Message**
```bash
curl -X POST http://localhost:8080/send-message \
  -H "Content-Type: application/json" \
  -H "x-session-id: session_123" \
  -d '{
    "phoneNumber": "6281234567890",
    "message": "Hello World!"
  }'
```

### **Get Bot Status**
```bash
curl http://localhost:8080/bot/status
```

### **Toggle Bot**
```bash
curl -X POST http://localhost:8080/bot/toggle \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": true
  }'
```

### **Test Bot API**
```bash
curl -X POST http://localhost:8080/bot/test-api \
  -H "Content-Type: application/json" \
  -d '{
    "keyword": "halo"
  }'
```

## 📊 **Response Status Codes**

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## 🔒 **Security Headers**

### **Required Headers**
- `Content-Type: application/json` - Untuk POST/PUT requests
- `x-session-id: session_id` - Untuk session-specific requests

### **Optional Headers**
- `User-Agent: Custom Agent` - Custom user agent
- `Authorization: Bearer token` - Untuk future JWT implementation

## 📈 **Rate Limiting**

### **Default Limits**
- **Login**: 5 requests per minute
- **API Calls**: 100 requests per minute
- **Bot API**: 50 requests per minute

### **Rate Limit Response**
```json
{
  "status": "error",
  "message": "Rate limit exceeded",
  "code": "RATE_LIMIT_EXCEEDED",
  "retryAfter": 60
}
```

## 🔍 **Debugging**

### **Enable Debug Logs**
```bash
# Set environment variable
export DEBUG=true

# Or in app.js
process.env.DEBUG = 'true';
```

### **Debug Response**
```json
{
  "status": "success",
  "data": {...},
  "debug": {
    "timestamp": "2024-01-01T12:00:00.000Z",
    "requestId": "req_123",
    "processingTime": "150ms"
  }
}
```

## 📝 **Notes**

### **Session Management**
- Sessions disimpan di SQLite database
- Session timeout setelah 24 jam idle
- QR code expired setelah 60 detik

### **Bot Configuration**
- Bot config disimpan di `config/botConfig.js`
- Perubahan config memerlukan restart aplikasi
- Bot status real-time update setiap 5 detik

### **Error Handling**
- Semua error di-log ke console
- Error response konsisten format
- Debug mode untuk detail error

---

**📞 Support**
- Dokumentasi: README.md
- Guide: GUIDE.md
- Issues: GitHub Issues 