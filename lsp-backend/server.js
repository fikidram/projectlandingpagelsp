/*
================================================================================
File: server.js (File Utama)
================================================================================
Deskripsi:
- File ini adalah titik masuk utama untuk aplikasi backend.
- Menginisialisasi server Express.
- Menghubungkan ke database MongoDB.
- Menetapkan middleware (CORS, body-parser).
- Mendefinisikan rute API utama.
- Menjalankan server pada port yang ditentukan.
*/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Impor rute API
const skemaRoutes = require('./routes/skemaRoutes');
const jadwalRoutes = require('./routes/jadwalRoutes');
const seedDatabase = require('./seed'); // Impor fungsi seeder

// Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 5000;

// Konfigurasi koneksi MongoDB
// Mengambil dari environment variable atau menggunakan default local
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lsp-bpvp-aceh';

// Middleware
app.use(cors()); // Mengizinkan Cross-Origin Resource Sharing
app.use(express.json()); // Mem-parsing body request JSON

// Rute API
app.use('/api/skema', skemaRoutes);
app.use('/api/jadwal', jadwalRoutes);

// Endpoint untuk melakukan seeding database (opsional, hanya untuk pengembangan)
app.get('/api/seed', async (req, res) => {
    try {
        await seedDatabase();
        res.status(200).send('Database berhasil di-seed dengan data awal.');
    } catch (error) {
        res.status(500).send(`Error saat seeding database: ${error.message}`);
    }
});


// Fungsi untuk memulai server dan koneksi database
const startServer = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Berhasil terhubung ke MongoDB');

        // Setelah terhubung, jalankan seeder untuk mengisi data awal jika database kosong
        await seedDatabase();

        app.listen(PORT, () => {
            console.log(`Server berjalan di port ${PORT}`);
        });
    } catch (error) {
        console.error('Gagal terhubung ke MongoDB', error);
        process.exit(1);
    }
};

// Mulai server
startServer();