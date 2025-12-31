
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
routerSkema.get('/', async (req, res) => {
    try {
        const skemas = await Skema.find();
        res.json(skemas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = routerSkema;