const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Skema = require('./models/Skema');
const UnitKompetensi = require('./models/UnitKompetensi');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lsp-bpvp-aceh')
    .then(() => console.log('MongoDB Connected for Correction'))
    .catch(err => console.log(err));

const correctData = async () => {
    try {
        const targetTitle = "Plate Welder SMAW 2G/PC";
        const skema = await Skema.findOne({ judul: targetTitle });

        if (!skema) {
            console.log(`Skema '${targetTitle}' not found.`);
            process.exit(1);
        }

        console.log(`Updating data for Skema: ${skema.judul}`);

        // Update Description
        skema.deskripsi = "(Keputusan Menteri Ketenagakerjaan Republik Indonesia Nomor 27 Tahun 2021 tanggal 13 April 2021 tentang Perubahan atas Keputusan Menteri Ketenagakerjaan Republik Indonesia Nomor 98 Tahun 2018 tentang Penetapan Standar Kompetensi Kerja Nasional Indonesia Kategori Industri Pengolahan Golongan Pokok Industri Logam Dasar Bidang Jasa Pembuatan Barang-barang dari Logam Subbidang Pengelasan)";
        await skema.save();
        console.log('Description updated.');

        // Update Units
        await UnitKompetensi.deleteMany({ skema: skema._id });

        const newUnits = [
            {
                skema: skema._id,
                kode_unit: "C.25LAS01.001.1",
                judul: "Melaksanakan Persiapan Tempat Kerja"
            },
            {
                skema: skema._id,
                kode_unit: "C.25LAS01.026.1",
                judul: "Memperbaiki Hasil Pengelasan"
            },
            {
                skema: skema._id,
                kode_unit: "C.25LAS01.029.1",
                judul: "Membuat Sambungan Las Kampuh (Groove) sesuai WPS untuk Pengelasan Pelat ke Pelat, dan sesuai dengan Proses yang Digunakan"
            }
        ];

        await UnitKompetensi.insertMany(newUnits);
        console.log('Units updated successfully!');

        process.exit(0);
    } catch (error) {
        console.error('Error correcting data:', error);
        process.exit(1);
    }
};

correctData();
