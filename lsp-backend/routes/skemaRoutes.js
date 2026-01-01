
/*
================================================================================
File: routes/skemaRoutes.js
================================================================================
Deskripsi:
- Mendefinisikan endpoint API untuk data skema sertifikasi.
- Contoh: GET /api/skema akan mengambil semua data skema.
*/

const expressSkema = require('express');
const routerSkema = expressSkema.Router();
const Skema = require('../models/Skema');

// GET: Mengambil semua skema sertifikasi
// GET: Mengambil semua skema sertifikasi dengan pagination
routerSkema.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12; // Default limit 12
        const startIndex = (page - 1) * limit;

        const total = await Skema.countDocuments();
        const skemas = await Skema.find().limit(limit).skip(startIndex);

        res.json({
            data: skemas,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET: Mengambil satu skema berdasarkan ID beserta unit kompetensinya
routerSkema.get('/:id', async (req, res) => {
    try {
        const skema = await Skema.findById(req.params.id);
        if (!skema) {
            return res.status(404).json({ message: 'Skema tidak ditemukan' });
        }

        const UnitKompetensi = require('../models/UnitKompetensi');
        const units = await UnitKompetensi.find({ skema: skema._id });

        res.json({
            data: skema,
            units: units
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = routerSkema;