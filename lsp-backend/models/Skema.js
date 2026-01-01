/*
================================================================================
File: models/Skema.js
================================================================================
Deskripsi:
- Mendefinisikan struktur (schema) untuk koleksi 'skemas' di MongoDB.
- Setiap dokumen akan merepresentasikan satu skema sertifikasi.
*/

const mongooseSkema = require('mongoose');

const skemaSchema = new mongooseSkema.Schema({
    judul: { type: String, required: true },
    jenis: { type: String, required: true },
    deskripsi: { type: String, required: false, default: "Belum ada deskripsi" },
    ringkasan: { type: String, required: false, default: "" },
    gambar: { type: String, required: false, default: "https://placehold.co/400x250/3b82f6/ffffff?text=Skema+LSP" },
});

module.exports = mongooseSkema.model('Skema', skemaSchema);
