# 🎨 UI Documentation

Dokumentasi lengkap untuk tampilan dan user interface WhatsApp Gateway.

## 📋 **Daftar Isi**

- [Halaman Utama](#-halaman-utama)
- [Login Page](#-login-page)
- [Dashboard](#-dashboard)
- [Connected Page](#-connected-page)
- [Bot Monitor](#-bot-monitor)
- [QR Code Page](#-qr-code-page)
- [User Management](#-user-management)
- [Responsive Design](#-responsive-design)
- [Color Scheme](#-color-scheme)
- [Components](#-components)

## 🏠 **Halaman Utama**

### **URL**: `/`

**File**: `views/index.ejs`

### **Layout Structure**

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

### **Components**

#### **1. Navigation Bar**

- **Logo**: WhatsApp Gateway
- **Menu**: Dashboard, Users, Logout
- **User Info**: Username dan role

#### **2. Add Number Form**

```html
<form action="/sessions" method="post">
  <label>WhatsApp Number</label>
  <input type="text" placeholder="Number (e.g. 08xxxx or 628xxxx)" />
  <button type="submit">Add Number</button>
</form>
```

#### **3. Sessions Table**

- **Columns**: User, Status, Company, Actions
- **Status Indicators**: Green (Connected), Red (Disconnected)
- **Actions**: QR Scan, Delete, Disconnect
- **Auto-refresh**: Setiap 10 detik

### **Features**

- ✅ **Real-time Updates**: Status session live
- ✅ **Responsive Design**: Mobile-friendly
- ✅ **Toast Notifications**: Success/error messages
- ✅ **Confirmation Modals**: Delete confirmation

## 🔐 **Login Page**

### **URL**: `/login`

**File**: `views/login.ejs`

### **Layout Structure**

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

### **Components**

#### **1. Header**

- **Title**: WhatsApp Gateway
- **Icon**: Robot emoji 🤖
- **Subtitle**: Login to access dashboard

#### **2. Login Form**

```html
<form action="/login" method="post">
  <input type="text" name="username" placeholder="Username" />
  <input type="password" name="password" placeholder="Password" />
  <button type="submit">Login</button>
</form>
```

#### **3. Register Link**

- **Text**: "Don't have an account? Register here"
- **Link**: `/register`

### **Features**

- ✅ **Form Validation**: Client-side validation
- ✅ **Error Messages**: Invalid credentials
- ✅ **Remember Me**: Session persistence
- ✅ **Responsive**: Mobile-friendly design

## 📊 **Dashboard**

### **URL**: `/`

**File**: `views/index.ejs`

### **Color Scheme**

- **Primary**: `#3be676` (WhatsApp Green)
- **Background**: `#fcf5eb` (Light Cream)
- **Cards**: `white/90` with backdrop blur
- **Borders**: `gray-800`

### **Status Indicators**

- 🟢 **Connected**: `bg-green-500`
- 🔴 **Disconnected**: `bg-red-500`
- 🔵 **API Status**: `bg-blue-500`
- 🟣 **Auto-Reply**: `bg-purple-500`

### **Interactive Elements**

- **Buttons**: Hover effects, active states
- **Forms**: Focus states, validation
- **Tables**: Hover rows, click actions
- **Modals**: Backdrop blur, animations

## 💬 **Connected Page**

### **URL**: `/connected`

**File**: `views/connected.ejs`

### **Layout Structure**

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

### **Components**

#### **1. Send Message Card**

- **Title**: "Send Message"
- **Sender Info**: Number ID
- **Form Elements**:
  - Radio buttons (Number/Group)
  - Input field (Recipient)
  - Textarea (Message)
  - Send button

#### **2. Bot Monitor Card**

- **Title**: "🤖 Bot Monitor"
- **Session Info**: Session ID
- **Status Indicators**:
  - Bot Status (Enabled/Disabled)
  - API Status (Connected sessions)
  - Auto-Reply Status (Active/Inactive)
- **Controls**:
  - Enable/Disable buttons
  - Full Monitor link
- **API Testing**:
  - Keyword input
  - Test button
  - Result display

#### **3. Group List Card**

- **Title**: "Group List"
- **Table**: Group name, Group ID
- **Pagination**: Prev/Next buttons
- **Copy Function**: Click to copy group ID

#### **4. API Documentation Card**

- **Title**: "API Documentation"
- **Endpoints**:
  - Send Message to Number
  - Send Message to Group
- **Headers**: Session ID
- **Body Examples**: JSON format
- **Copy Function**: Click to copy

### **Features**

- ✅ **Real-time Updates**: Bot status setiap 5 detik
- ✅ **Interactive Controls**: Enable/disable bot
- ✅ **API Testing**: Test dengan keyword
- ✅ **Copy Functions**: Copy session ID, group ID
- ✅ **Responsive Layout**: 3-column desktop, stack mobile

## 🤖 **Bot Monitor**

### **URL**: `/bot-monitor`

**File**: `views/bot-monitor.ejs`

### **Layout Structure**

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
│ ┌─────────────────────────────────┐ │
│ │ Sessions List                   │ │
│ │ [Session Details]               │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### **Components**

#### **1. Bot Status Dashboard**

- **Controls**: Enable, Disable, Settings buttons
- **Status Cards**: 3 cards dengan indicators
- **Real-time Updates**: Auto-refresh setiap 5 detik

#### **2. API Testing Section**

- **Input Field**: Keyword untuk test
- **Test Button**: Trigger API test
- **Result Display**: Success/error messages

#### **3. Sessions List**

- **Session Details**: Status, last activity
- **Actions**: View details, disconnect

### **Features**

- ✅ **Advanced Monitoring**: Detailed bot status
- ✅ **API Testing**: Real-time API testing
- ✅ **Session Management**: View all sessions
- ✅ **Settings Panel**: Bot configuration

## 📱 **QR Code Page**

### **URL**: `/qr`

**File**: `views/qr.ejs`

### **Layout Structure**

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

### **Components**

#### **1. QR Code Display**

- **Image**: QR code untuk scan
- **Session Info**: Session ID dan number
- **Status**: Loading, expired, connected

#### **2. Controls**

- **Refresh Button**: Generate new QR
- **Back Button**: Return to dashboard

### **Features**

- ✅ **Auto-refresh**: QR expired detection
- ✅ **Status Updates**: Connection status
- ✅ **Responsive**: Mobile-friendly QR display

## 👥 **User Management**

### **URL**: `/users`

**File**: `views/users.ejs`

### **Layout Structure**

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

### **Components**

#### **1. Register Form**

- **Fields**: Username, Password, Confirm Password, Company
- **Validation**: Client-side validation
- **Submit**: Register new user

#### **2. Users Table**

- **Columns**: User, Role, Company, Actions
- **Role Indicators**: Admin (purple), User (blue)
- **Actions**: Reset Password, Delete

#### **3. Password Modal**

- **Display**: New password
- **Copy Function**: Copy to clipboard
- **Close**: Dismiss modal

### **Features**

- ✅ **User Registration**: Add new users
- ✅ **Password Reset**: Generate new passwords
- ✅ **Role Management**: Admin/user roles
- ✅ **Confirmation Modals**: Delete confirmation

## 📱 **Responsive Design**

### **Breakpoints**

- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

### **Mobile Layout**

```
┌─────────────────────────────────────┐
│ Navigation (Hamburger Menu)         │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Add Number Form                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Sessions Table (Scrollable)     │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### **Desktop Layout**

```
┌─────────────────────────────────────┐
│ Navigation Bar (Full Menu)          │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Add Number Form                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Sessions Table (Full Width)     │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### **Connected Page Layouts**

#### **Mobile (Connected)**

```
┌─────────────────────────────────────┐
│ Send Message Card                   │
├─────────────────────────────────────┤
│ Bot Monitor Card                   │
├─────────────────────────────────────┤
│ Group List Card                    │
├─────────────────────────────────────┤
│ API Documentation Card              │
└─────────────────────────────────────┘
```

#### **Desktop (Connected)**

```
┌─────────────────────────────────────┐
│ Send │ Bot  │ Group │ API Docs     │
│ Msg  │ Mon  │ List  │              │
│      │      │       │              │
└─────────────────────────────────────┘
```

## 🎨 **Color Scheme**

### **Primary Colors**

- **WhatsApp Green**: `#3be676`
- **Background**: `#fcf5eb`
- **White**: `#ffffff`
- **Gray**: `#6b7280`

### **Status Colors**

- **Success/Connected**: `#10b981` (Green)
- **Error/Disconnected**: `#ef4444` (Red)
- **Warning**: `#f59e0b` (Yellow)
- **Info**: `#3b82f6` (Blue)

### **UI Elements**

- **Cards**: `white/90` with backdrop blur
- **Borders**: `gray-800`
- **Text**: `gray-700` (primary), `gray-500` (secondary)
- **Buttons**: Various colors based on action

## 🧩 **Components**

### **1. Navigation Bar**

```html
<nav
  class="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-800 z-50"
>
  <div class="flex items-center justify-between px-6 py-4">
    <div class="flex items-center gap-4">
      <h1 class="text-xl font-bold text-[#3be676]">WhatsApp Gateway</h1>
    </div>
    <div class="flex items-center gap-4">
      <a href="/" class="text-gray-700 hover:text-[#3be676]">Dashboard</a>
      <a href="/users" class="text-gray-700 hover:text-[#3be676]">Users</a>
      <a href="/logout" class="text-gray-700 hover:text-[#3be676]">Logout</a>
    </div>
  </div>
</nav>
```

### **2. Status Card**

```html
<div class="bg-gray-50 rounded-lg p-3">
  <div class="flex items-center gap-2">
    <span class="w-3 h-3 rounded-full bg-green-500"></span>
    <span class="font-medium text-sm">Bot Status</span>
  </div>
  <p class="text-xs text-gray-600 mt-1">Enabled</p>
</div>
```

### **3. Button Component**

```html
<button
  class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition-all"
>
  Enable Bot
</button>
```

### **4. Toast Notification**

```html
<div
  class="fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-semibold bg-green-500"
>
  Success message
</div>
```

### **5. Modal Component**

```html
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
  <div
    class="bg-white/50 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-sm w-full text-center"
  >
    <h3 class="text-lg font-semibold mb-4">Confirm Action</h3>
    <p class="mb-6 text-gray-700">Are you sure?</p>
    <div class="flex justify-center gap-4">
      <button class="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
        Cancel
      </button>
      <button
        class="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
      >
        Confirm
      </button>
    </div>
  </div>
</div>
```

## 📊 **UI Features**

### **1. Real-time Updates**

- **Auto-refresh**: Dashboard setiap 10 detik
- **Bot Status**: Update setiap 5 detik
- **Session Status**: Live connection status
- **Toast Notifications**: Success/error messages

### **2. Interactive Elements**

- **Hover Effects**: Button hover states
- **Active States**: Button click animations
- **Focus States**: Form input focus
- **Loading States**: Spinner animations

### **3. Accessibility**

- **Keyboard Navigation**: Tab navigation
- **Screen Reader**: ARIA labels
- **Color Contrast**: WCAG compliant
- **Responsive**: Mobile-first design

### **4. Performance**

- **Lazy Loading**: Load components on demand
- **Minified Assets**: Optimized CSS/JS
- **Caching**: Browser caching
- **CDN**: External resources

## 🎯 **Design Principles**

### **1. Consistency**

- **Color Scheme**: Consistent throughout
- **Typography**: Same font family
- **Spacing**: Consistent margins/padding
- **Components**: Reusable patterns

### **2. Simplicity**

- **Clean Layout**: Minimal clutter
- **Clear Hierarchy**: Visual hierarchy
- **Intuitive Navigation**: Easy to use
- **Focused Content**: Important info prominent

### **3. Responsiveness**

- **Mobile-First**: Mobile-first approach
- **Flexible Layout**: Adapts to screen size
- **Touch-Friendly**: Large touch targets
- **Readable Text**: Appropriate font sizes

### **4. Accessibility**

- **High Contrast**: Good color contrast
- **Keyboard Accessible**: Full keyboard navigation
- **Screen Reader**: ARIA labels and roles
- **Semantic HTML**: Proper HTML structure

---

**🎨 UI Documentation Complete!**

Semua tampilan dan komponen UI telah didokumentasikan dengan lengkap.
