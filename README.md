# 🍡 Mochi Time

Website pemesanan mochi online dengan tampilan modern dan responsif.

## Preview

> Buka `mochi.html` di browser atau deploy ke Vercel.

## Fitur

- Halaman utama dengan menu lengkap 7 rasa mochi
- Form order dengan kalkulasi harga otomatis
- Halaman admin untuk melihat data pesanan
- Responsive — mobile & desktop friendly
- Backend REST API dengan Node.js + Express + SQLite

## Struktur Project

```
├── mochi.html       # Halaman utama
├── mochi.css        # Styling
├── mochi.js         # Logic frontend
├── admin.html       # Dashboard pesanan
├── assets/image/    # Gambar produk
└── backend/
    ├── server.js    # Express server
    ├── database.js  # Koneksi SQLite
    └── package.json
```

## Cara Jalankan

**Frontend**
Buka `mochi.html` langsung di browser atau gunakan Live Server di VS Code.

**Backend**

```bash
cd backend
npm install
npm run dev
```

Server berjalan di `http://localhost:3000`

## API Endpoints

| Method | Endpoint          | Keterangan          |
| ------ | ----------------- | ------------------- |
| POST   | `/api/orders`     | Buat pesanan baru   |
| GET    | `/api/orders`     | Lihat semua pesanan |
| GET    | `/api/orders/:id` | Detail pesanan      |

## Tech Stack

- HTML, CSS, JavaScript (Vanilla)
- Node.js + Express
- SQLite (better-sqlite3)
- Google Fonts (Nunito)
