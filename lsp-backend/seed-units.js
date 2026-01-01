const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Skema = require('./models/Skema');
const UnitKompetensi = require('./models/UnitKompetensi');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lsp-bpvp-aceh')
    .then(() => console.log('MongoDB Connected for Seeding Units'))
    .catch(err => console.log(err));

const seedUnits = async () => {
    try {
        // Find a scheme to attach units to (e.g., the first one)
        const skema = await Skema.findOne();

        if (!skema) {
            console.log('No Skema found. Please run main seed first.');
            process.exit(1);
        }

        console.log(`Adding units to Skema: ${skema.judul}`);

        // Clear existing units for this scheme to avoid duplicates on re-run
        await UnitKompetensi.deleteMany({ skema: skema._id });

        const units = [
            {
                skema: skema._id,
                kode_unit: "P.85KOR00.004.1",
                judul: "Memperkenalkan Diri dalam Bahasa Korea"
            },
            {
                skema: skema._id,
                kode_unit: "P.85KOR00.006.1",
                judul: "Menjelaskan Panduan Arah dalam Bahasa Korea"
            },
            {
                skema: skema._id,
                kode_unit: "P.85KOR00.007.1",
                judul: "Mendeskripsikan Orang dalam Bahasa Korea"
            },
            {
                skema: skema._id,
                kode_unit: "P.85KOR00.009.1",
                judul: "Mengomunikasikan Informasi Terkait Musim dan/atau Cuaca dalam Bahasa Korea"
            },
            {
                skema: skema._id,
                kode_unit: "P.85KOR00.012.1",
                judul: "Membeli Barang dalam Bahasa Korea"
            },
            {
                skema: skema._id,
                kode_unit: "P.85KOR00.013.1",
                judul: "Menyampaikan Rencana Kegiatan dalam Bahasa Korea"
            },
            {
                skema: skema._id,
                kode_unit: "P.85KOR00.015.1",
                judul: "Berkomunikasi Lewat Telepon dalam Bahasa Korea"
            },
            {
                skema: skema._id,
                kode_unit: "P.85KOR00.016.1",
                judul: "Mengajak atau Mengundang dalam Bahasa Korea"
            },
            {
                skema: skema._id,
                kode_unit: "P.85KOR00.017.1",
                judul: "Mengajukan Permohonan Izin dalam Bahasa Korea"
            }
        ];

        await UnitKompetensi.insertMany(units);

        console.log('Units seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding units:', error);
        process.exit(1);
    }
};

seedUnits();
