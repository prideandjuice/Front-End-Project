const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'mochi.db'));

// Buat tabel orders kalau belum ada
db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        name      TEXT NOT NULL,
        email     TEXT NOT NULL,
        address   TEXT NOT NULL,
        flavor    TEXT NOT NULL,
        quantity  INTEGER NOT NULL,
        total     INTEGER NOT NULL,
        status    TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

module.exports = db;
