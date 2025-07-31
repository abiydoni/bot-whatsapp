const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

class DatabaseManager {
    constructor() {
        // Pastikan folder data ada
        const dataDir = path.join(__dirname, '../data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        const dbPath = path.join(dataDir, 'sessions.db');
        this.db = new sqlite3.Database(dbPath);
        this.initDatabase();
    }
    
    initDatabase() {
        return new Promise((resolve, reject) => {
            // Create sessions table
            this.db.exec(`
            CREATE TABLE IF NOT EXISTS sessions (
                session_id TEXT PRIMARY KEY,
                number_id TEXT,
                is_connected INTEGER,
                created_at TEXT,
                last_activity TEXT,
                auth_data TEXT,
                metadata TEXT,
                connected_at TEXT,
                owner TEXT,
                owner_company TEXT
            );
        
            CREATE INDEX IF NOT EXISTS idx_number_id ON sessions(number_id);
            CREATE INDEX IF NOT EXISTS idx_is_connected ON sessions(is_connected);
            
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password_hash TEXT,
                company TEXT,
                role TEXT DEFAULT 'user'
            );
            `, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                // Create default admin if not exists
                this.db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    
                    if (row.count === 0) {
                        const passwordHash = bcrypt.hashSync('admin', 12);
                        this.db.run('INSERT INTO users (username, password_hash, role, company) VALUES (?, ?, ?, ?)',
                            ['admin', passwordHash, 'admin', 'WhatsApp API'],
                            (err) => {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    } else {
                        resolve();
                    }
                });
            });
        });
    }
    
    async saveSession(sessionId, data) {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare(`
            INSERT OR REPLACE INTO sessions 
            (session_id, number_id, is_connected, created_at, last_activity, auth_data, metadata, connected_at, owner, owner_company)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);
        
            stmt.run(
                sessionId,
                data.numberId,
                data.isConnected ? 1 : 0,
                data.createdAt.toISOString(),
                data.lastActivity ? data.lastActivity.toISOString() : null,
                JSON.stringify(data.authData || {}),
                JSON.stringify(data.metadata || {}),
                data.connectedAt ? data.connectedAt.toISOString() : null,
                data.owner || null,
                data.ownerCompany || null,
                (err) => {
                    if (err) reject(err);
                    else resolve();
                }
            );
            stmt.finalize();
        });
    }
    
    async getSessionByNumber(numberId) {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare(`
            SELECT * FROM sessions
            WHERE number_id = ?
            `);
            
            stmt.get(numberId, (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                if (!row) {
                    resolve(null);
                    return;
                }
            
                resolve({
                    sessionId: row.session_id,
                    numberId: row.number_id,
                    isConnected: row.is_connected === 1,
                    createdAt: new Date(row.created_at),
                    lastActivity: row.last_activity ? new Date(row.last_activity) : null,
                    authData: JSON.parse(row.auth_data),
                    metadata: JSON.parse(row.metadata),
                    connectedAt: row.connected_at ? new Date(row.connected_at) : null
                });
            });
            stmt.finalize();
        });
    }
    
    async getSession(sessionId) {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare('SELECT * FROM sessions WHERE session_id = ?');
            stmt.get(sessionId, (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                if (!row) {
                    resolve(null);
                    return;
                }
            
                resolve({
                    sessionId: row.session_id,
                    numberId: row.number_id,
                    isConnected: row.is_connected === 1,
                    createdAt: new Date(row.created_at),
                    lastActivity: row.last_activity ? new Date(row.last_activity) : null,
                    authData: JSON.parse(row.auth_data),
                    metadata: JSON.parse(row.metadata),
                    connectedAt: row.connected_at ? new Date(row.connected_at) : null,
                    owner: row.owner || null,
                    ownerCompany: row.owner_company || null
                });
            });
            stmt.finalize();
        });
    }
    
    async getAllSessions() {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare('SELECT * FROM sessions');
            stmt.all((err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                resolve(rows.map(row => ({
                    sessionId: row.session_id,
                    numberId: row.number_id,
                    isConnected: row.is_connected === 1,
                    createdAt: new Date(row.created_at),
                    lastActivity: row.last_activity ? new Date(row.last_activity) : null,
                    authData: JSON.parse(row.auth_data),
                    metadata: JSON.parse(row.metadata),
                    connectedAt: row.connected_at ? new Date(row.connected_at) : null,
                    owner: row.owner || null,
                    ownerCompany: row.owner_company || null
                })));
            });
            stmt.finalize();
        });
    }
    
    async deleteSession(sessionId) {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare('DELETE FROM sessions WHERE session_id = ?');
            stmt.run(sessionId, (err) => {
                if (err) reject(err);
                else resolve();
            });
            stmt.finalize();
        });
    }

    async createUser(username, passwordHash, role = 'user', company = null) {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare('INSERT INTO users (username, password_hash, role, company) VALUES (?, ?, ?, ?)');
            stmt.run([username, passwordHash, role, company], (err) => {
                if (err) reject(err);
                else resolve();
            });
            stmt.finalize();
        });
    }

    async getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare('SELECT * FROM users WHERE username = ?');
            stmt.get(username, (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                if (!row) {
                    resolve(null);
                    return;
                }
                
                resolve({ 
                    id: row.id, 
                    username: row.username, 
                    passwordHash: row.password_hash, 
                    role: row.role,
                    company: row.company 
                });
            });
            stmt.finalize();
        });
    }

    async getAllUsers() {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare('SELECT * FROM users');
            stmt.all((err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                resolve(rows.map(row => ({ 
                    id: row.id, 
                    username: row.username, 
                    passwordHash: row.password_hash, 
                    role: row.role,
                    company: row.company 
                })));
            });
            stmt.finalize();
        });
    }

    async updateUserPassword(username, newPasswordHash) {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare('UPDATE users SET password_hash = ? WHERE username = ?');
            stmt.run([newPasswordHash, username], (err) => {
                if (err) reject(err);
                else resolve();
            });
            stmt.finalize();
        });
    }

    async deleteUser(username) {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare('DELETE FROM users WHERE username = ?');
            stmt.run(username, (err) => {
                if (err) reject(err);
                else resolve();
            });
            stmt.finalize();
        });
    }
}

module.exports = DatabaseManager;