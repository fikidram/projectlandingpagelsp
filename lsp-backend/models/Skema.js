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
    deskripsi: { type: String, required: true },
    gambar: { type: String, required: true },
});

module.exports = mongooseSkema.model('Skema', skemaSchema);
