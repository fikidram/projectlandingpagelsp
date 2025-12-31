/*
================================================================================
File: routes/jadwalRoutes.js
================================================================================
Deskripsi:
- Mendefinisikan endpoint API untuk data jadwal uji kompetensi.
- Contoh: GET /api/jadwal akan mengambil semua data jadwal.
*/

const expressJadwal = require('express');
const routerJadwal = expressJadwal.Router();
const Jadwal = require('../models/Jadwal');

// GET: Mengambil semua jadwal
routerJadwal.get('/', async (req, res) => {
    try {
        const jadwals = await Jadwal.find();
        res.json(jadwals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = routerJadwal;