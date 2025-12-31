
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

module.exports = routerSkema;