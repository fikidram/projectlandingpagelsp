/*
================================================================================
File: models/UnitKompetensi.js
================================================================================
Deskripsi:
- Mendefinisikan struktur (schema) untuk koleksi 'unit_kompetensis' di MongoDB.
- Setiap dokumen akan merepresentasikan satu unit kompetensi yang tergabung dalam skema.
*/

const mongoose = require('mongoose');

const unitKompetensiSchema = new mongoose.Schema({
    skema: { type: mongoose.Schema.Types.ObjectId, ref: 'Skema', required: true },
    kode_unit: { type: String, required: true },
    judul: { type: String, required: true },
});

module.exports = mongoose.model('UnitKompetensi', unitKompetensiSchema);
