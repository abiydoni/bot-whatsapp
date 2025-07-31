# WhatsApp Gateway

A WhatsApp Gateway built with Node.js, Express, Baileys, and SQLite.

## Features
- Multi-user: Admin & User roles
- User can scan QR and manage their own session
- Admin can add/delete/disconnect all sessions, create users
- Session & user data stored in SQLite (`data/sessions.db`)
- Web UI with Tailwind CSS

## Requirements
- Node.js v16+ (recommended v20+)
- npm
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the app**
   ```bash
   npm start
   ```
   At first run, the app will create a default admin user if the database is empty.

4. **Open in browser**
   - Visit: [http://localhost:8080](http://localhost:8080)

## Default Admin Login
- **Username:** `admin`
- **Password:** `admin`

> **Change the default admin password after first login for security!**

## Folder Structure
- `app.js` - Main entry point
- `views/` - EJS templates (UI)
- `routes/` - Express route handlers
- `managers/` - WhatsApp & DB logic
- `data/` - SQLite database file
- `public/` - Static assets (JS, CSS, images)

## Development
- To auto-restart on file changes, use:
  ```bash
  npm run dev
  ```
  Requires `nodemon` (Issues)

## Notes
- All sessions and users are stored in `data/sessions.db` (SQLite)
- Each user (except admin) can only add 1 WhatsApp number/session
- Admin can add/manage all sessions and users
- QR code login required for each WhatsApp number

## Troubleshooting
- If you see errors about missing dependencies, run `npm install` again.
- If port 8080 is in use, change the `PORT` in `app.js` or set `PORT` env variable.
- For a clean start, you can delete `data/sessions.db` (will reset all users/sessions).

## License
MIT 