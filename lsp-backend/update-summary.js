const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Skema = require('./models/Skema');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lsp-bpvp-aceh')
    .then(() => console.log('MongoDB Connected for Summary Update'))
    .catch(err => console.log(err));

const updateSummary = async () => {
    try {
        const targetTitle = "Plate Welder SMAW 2G/PC";
        const skema = await Skema.findOne({ judul: targetTitle });

        if (!skema) {
            console.log(`Skema '${targetTitle}' not found.`);
            process.exit(1);
        }

        console.log(`Updating summary for Skema: ${skema.judul}`);

        // Summary based on the competency units:
        // 1. Melaksanakan Persiapan Tempat Kerja
        // 2. Memperbaiki Hasil Pengelasan
        // 3. Membuat Sambungan Las Kampuh (Groove)...

        skema.ringkasan = "Meliputi kompetensi melaksanakan persiapan tempat kerja, pembuatan sambungan las kampuh (Groove) sesuai WPS, dan memperbaiki hasil pengelasan.";

        await skema.save();
        console.log('Summary updated successfully!');

        process.exit(0);
    } catch (error) {
        console.error('Error updating summary:', error);
        process.exit(1);
    }
};

updateSummary();
