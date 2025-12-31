/*
================================================================================
File: models/Jadwal.js
================================================================================
Deskripsi:
- Mendefinisikan struktur (schema) untuk koleksi 'jadwals' di MongoDB.
- Setiap dokumen akan merepresentasikan satu jadwal uji kompetensi.
*/

const mongooseJadwal = require('mongoose');

const jadwalSchema = new mongooseJadwal.Schema({
    nama: { type: String, required: true },
    tanggal: { type: String, required: true },
    lokasi: { type: String, required: true },
    status: { type: String, required: true },
    statusColor: { type: String, required: true },
});

module.exports = mongooseJadwal.model('Jadwal', jadwalSchema);

