# 📸 Visual Guide

Panduan visual lengkap untuk WhatsApp Gateway dengan screenshot dan diagram.

## 📋 **Daftar Isi**

- [Screenshot Gallery](#-screenshot-gallery)
- [Flow Diagrams](#-flow-diagrams)
- [UI Mockups](#-ui-mockups)
- [Icon Guide](#-icon-guide)
- [Color Palette](#-color-palette)

## 📸 **Screenshot Gallery**

### **1. Login Page**

```
┌─────────────────────────────────────┐
│                                     │
│        🤖 WhatsApp Gateway          │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Login Form                      │ │
│ │ Username: [________________]    │ │
│ │ Password: [________________]    │ │
│ │                                 │ │
│ │ [Login Button]                  │ │
│ │                                 │ │
│ │ [Register Link]                 │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Features:**

- Clean login form
- WhatsApp green branding
- Responsive design
- Error message display

### **2. Dashboard (Main Page)**

```
┌─────────────────────────────────────┐
│ Navigation Bar                      │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Add Number Form                 │ │
│ │ [Input Number] [Add Number]     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Sessions Table                  │ │
│ │ User │ Status │ Company │ Actions│ │
│ │ [User│ [Con-  │ [Com-   │ [QR] [X]│ │
│ │ Info]│ nected]│ pany]   │ [Discon]│ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Features:**

- Real-time session status
- Color-coded indicators
- Action buttons
- Auto-refresh

### **3. Connected Page**

```
┌─────────────────────────────────────┐
│ Navigation Bar                      │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│ │ Send    │ │ Bot     │ │ Group   │ │
│ │ Message │ │ Monitor │ │ List    │ │
│ │         │ │         │ │         │ │
│ └─────────┘ └─────────┘ └─────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ API Documentation               │ │
│ │ [API Endpoints]                │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Features:**

- 3-column layout
- Bot monitor integration
- API documentation
- Group management

### **4. Bot Monitor Page**

```
┌─────────────────────────────────────┐
│ Navigation Bar                      │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Bot Status Dashboard            │ │
│ │ [Enable] [Disable] [Settings]   │ │
│ │                                 │ │
│ │ ┌─────────┐ ┌─────────┐ ┌─────┐ │ │
│ │ │ Bot     │ │ API     │ │ Auto│ │ │
│ │ │ Status  │ │ Status  │ │Reply│ │ │
│ │ └─────────┘ └─────────┘ └─────┘ │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ API Testing                     │ │
│ │ [Keyword Input] [Test Button]   │ │
│ │ [Result Display]                │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Features:**

- Advanced bot controls
- Real-time status
- API testing interface
- Session management

### **5. QR Code Page**

```
┌─────────────────────────────────────┐
│ Navigation Bar                      │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ QR Code Scanner                 │ │
│ │                                 │ │
│ │        [QR Code Image]          │ │
│ │                                 │ │
│ │ Session: session_123            │ │
│ │ Number: 6281234567890           │ │
│ │                                 │ │
│ │ [Refresh QR] [Back to Dashboard]│ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Features:**

- QR code display
- Session information
- Refresh controls
- Status indicators

### **6. User Management Page**

```
┌─────────────────────────────────────┐
│ Navigation Bar                      │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Register User Form               │ │
│ │ [Username] [Password] [Company] │ │
│ │ [Register Button]               │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Users Table                     │ │
│ │ User │ Role │ Company │ Actions │ │
│ │ [User│ [Ad-│ [Com-   │ [Reset] │ │
│ │ Info]│ min]│ pany]   │ [Delete]│ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Features:**

- User registration
- Role management
- Password reset
- User deletion

## 🔄 **Flow Diagrams**

### **1. User Authentication Flow**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Start     │───▶│ Login Page  │───▶│ Dashboard   │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Logout    │    │   Register  │    │   Users     │
└─────────────┘    └─────────────┘    └─────────────┘
```

### **2. WhatsApp Session Flow**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Add Number  │───▶│ QR Code     │───▶│ Connected   │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Delete    │    │   Refresh   │    │ Send Msg    │
└─────────────┘    └─────────────┘    └─────────────┘
```

### **3. Bot Configuration Flow**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Bot Monitor │───▶│ Enable Bot  │───▶│ Test API    │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Full Monitor│    │ Disable Bot │    │ Configure   │
└─────────────┘    └─────────────┘    └─────────────┘
```

## 🎨 **UI Mockups**

### **1. Mobile Layout (Dashboard)**

```
┌─────────────────────────────────────┐
│ Navigation (Hamburger)              │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Add Number Form                 │ │
│ │ [Input Number] [Add Number]     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Sessions Table (Scrollable)     │ │
│ │ User │ Status │ Company │ Actions│ │
│ │ [User│ [Con-  │ [Com-   │ [QR] [X]│ │
│ │ Info]│ nected]│ pany]   │ [Discon]│ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### **2. Desktop Layout (Connected)**

```
┌─────────────────────────────────────┐
│ Navigation Bar                      │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│ │ Send    │ │ Bot     │ │ Group   │ │
│ │ Message │ │ Monitor │ │ List    │ │
│ │         │ │         │ │         │ │
│ └─────────┘ └─────────┘ └─────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ API Documentation               │ │
│ │ [API Endpoints]                │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### **3. Tablet Layout (Bot Monitor)**

```
┌─────────────────────────────────────┐
│ Navigation Bar                      │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Bot Status Dashboard            │ │
│ │ [Enable] [Disable] [Settings]   │ │
│ │                                 │ │
│ │ ┌─────────┐ ┌─────────┐ ┌─────┐ │ │
│ │ │ Bot     │ │ API     │ │ Auto│ │ │
│ │ │ Status  │ │ Status  │ │Reply│ │ │
│ │ └─────────┘ └─────────┘ └─────┘ │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ API Testing                     │ │
│ │ [Keyword Input] [Test Button]   │ │
│ │ [Result Display]                │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

## 🎯 **Icon Guide**

### **1. Navigation Icons**

- **Dashboard**: 📊 Chart icon
- **Users**: 👥 Group icon
- **Logout**: 🚪 Door icon
- **Settings**: ⚙️ Gear icon

### **2. Action Icons**

- **QR Code**: 📱 Phone icon
- **Delete**: 🗑️ Trash icon
- **Send**: 📤 Send icon
- **Copy**: 📋 Copy icon
- **Refresh**: 🔄 Refresh icon

### **3. Status Icons**

- **Connected**: 🟢 Green circle
- **Disconnected**: 🔴 Red circle
- **Loading**: ⏳ Spinner
- **Success**: ✅ Checkmark
- **Error**: ❌ X mark

### **4. Bot Icons**

- **Bot**: 🤖 Robot icon
- **API**: 🔌 Plug icon
- **Auto-Reply**: 💬 Message icon
- **Settings**: ⚙️ Gear icon

## 🎨 **Color Palette**

### **Primary Colors**

```
WhatsApp Green: #3be676
Background: #fcf5eb
White: #ffffff
Gray: #6b7280
```

### **Status Colors**

```
Success/Connected: #10b981 (Green)
Error/Disconnected: #ef4444 (Red)
Warning: #f59e0b (Yellow)
Info: #3b82f6 (Blue)
```

### **UI Elements**

```
Cards: white/90 with backdrop blur
Borders: gray-800
Text Primary: gray-700
Text Secondary: gray-500
```

### **Button Colors**

```
Primary: #3be676 (Green)
Secondary: #6b7280 (Gray)
Danger: #ef4444 (Red)
Warning: #f59e0b (Yellow)
Info: #3b82f6 (Blue)
```

## 📱 **Responsive Breakpoints**

### **Mobile (< 768px)**

- Single column layout
- Stacked cards
- Hamburger menu
- Touch-friendly buttons

### **Tablet (768px - 1024px)**

- Two-column layout
- Side navigation
- Medium-sized cards
- Touch and mouse friendly

### **Desktop (> 1024px)**

- Multi-column layout
- Full navigation bar
- Large cards
- Hover effects

## 🎭 **Animation Guide**

### **1. Button Animations**

```css
/* Hover Effect */
button:hover {
  transform: scale(1.02);
  transition: all 0.2s ease;
}

/* Active Effect */
button:active {
  transform: scale(0.95);
}
```

### **2. Card Animations**

```css
/* Card Hover */
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
```

### **3. Toast Animations**

```css
/* Toast Slide In */
.toast {
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
```

### **4. Modal Animations**

```css
/* Modal Fade In */
.modal {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

## 📊 **Component States**

### **1. Button States**

- **Default**: Gray background
- **Hover**: Darker background
- **Active**: Scale down
- **Disabled**: Grayed out

### **2. Form States**

- **Default**: Normal border
- **Focus**: Blue border
- **Error**: Red border
- **Success**: Green border

### **3. Status Indicators**

- **Connected**: Green circle + text
- **Disconnected**: Red circle + text
- **Loading**: Spinner + "Loading..."
- **Error**: Red circle + error message

### **4. Toast States**

- **Success**: Green background + checkmark
- **Error**: Red background + X mark
- **Warning**: Yellow background + exclamation
- **Info**: Blue background + info icon

## 🎯 **Design System**

### **1. Typography**

- **Headings**: Bold, large text
- **Body**: Regular, medium text
- **Captions**: Small, light text
- **Code**: Monospace font

### **2. Spacing**

- **Small**: 4px (0.25rem)
- **Medium**: 8px (0.5rem)
- **Large**: 16px (1rem)
- **Extra Large**: 32px (2rem)

### **3. Border Radius**

- **Small**: 4px (rounded)
- **Medium**: 8px (rounded-lg)
- **Large**: 16px (rounded-xl)
- **Full**: 50% (rounded-full)

### **4. Shadows**

- **Small**: 0 1px 3px rgba(0,0,0,0.1)
- **Medium**: 0 4px 6px rgba(0,0,0,0.1)
- **Large**: 0 10px 25px rgba(0,0,0,0.1)
- **Extra Large**: 0 20px 40px rgba(0,0,0,0.1)

---

**📸 Visual Guide Complete!**

Semua tampilan visual dan komponen UI telah didokumentasikan dengan lengkap.
