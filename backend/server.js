const express = require('express');
const cors    = require('cors');
const db      = require('./database');

const app  = express();
const PORT = 3000;
const PRICE_PER_ITEM = 12000;

app.use(cors());
app.use(express.json());

// POST /api/orders — buat pesanan baru
app.post('/api/orders', (req, res) => {
    const { name, email, address, flavor, quantity } = req.body;

    if (!name || !email || !address || !flavor || !quantity) {
        return res.status(400).json({ error: 'Semua field wajib diisi.' });
    }

    if (quantity < 1) {
        return res.status(400).json({ error: 'Jumlah minimal 1.' });
    }

    const total = quantity * PRICE_PER_ITEM;

    const stmt = db.prepare(`
        INSERT INTO orders (name, email, address, flavor, quantity, total)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(name, email, address, flavor, quantity, total);

    res.status(201).json({
        message: 'Pesanan berhasil dibuat!',
        orderId: result.lastInsertRowid,
        total,
    });
});

// GET /api/orders — lihat semua pesanan (buat admin)
app.get('/api/orders', (req, res) => {
    const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    res.json(orders);
});

// GET /api/orders/:id — detail pesanan
app.get('/api/orders/:id', (req, res) => {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!order) return res.status(404).json({ error: 'Pesanan tidak ditemukan.' });
    res.json(order);
});

app.listen(PORT, () => {
    console.log(`🍡 Mochi Time backend jalan di http://localhost:${PORT}`);
});
