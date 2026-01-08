const mongoose = require('mongoose');
require('dotenv').config();

const Skema = require('./models/Skema');
const UnitKompetensi = require('./models/UnitKompetensi');

// Pastikan URI mengarah ke Atlas (diambil dari .env)
const ATLAS_URI = process.env.MONGO_URI;

const DATA_TO_UPDATE = [
    {
        judul: "Plate Welder SMAW 2G/PC",
        deskripsi: "(Keputusan Menteri Ketenagakerjaan Republik Indonesia Nomor 27 Tahun 2021 tanggal 13 April 2021 tentang Perubahan atas Keputusan Menteri Ketenagakerjaan Republik Indonesia Nomor 98 Tahun 2018 tentang Penetapan Standar Kompetensi Kerja Nasional Indonesia Kategori Industri Pengolahan Golongan Pokok Industri Logam Dasar Bidang Jasa Pembuatan Barang-barang dari Logam Subbidang Pengelasan)",
        ringkasan: "Meliputi kompetensi melaksanakan persiapan tempat kerja, pembuatan sambungan las kampuh (Groove) sesuai WPS, dan memperbaiki hasil pengelasan.",
        units: [
            { kode_unit: "C.25LAS01.001.1", judul: "Melaksanakan Persiapan Tempat Kerja" },
            { kode_unit: "C.25LAS01.026.1", judul: "Memperbaiki Hasil Pengelasan" },
            { kode_unit: "C.25LAS01.029.1", judul: "Membuat Sambungan Las Kampuh (Groove) sesuai WPS untuk Pengelasan Pelat ke Pelat, dan sesuai dengan Proses yang Digunakan" }
        ]
    },
    {
        judul: "Service Sepeda Motor Konvensional",
        deskripsi: "Skema Sertifikasi Klaster Service Sepeda Motor Konvensional (Keputusan Menteri Ketenagakerjaan Republik Indonesia Nomor 147 Tahun 2019 tanggal 17 Juli 2019 tentang Penetapan Standar Kompetensi Kerja Nasional Indonesia Kategori Perdagangan Besar dan Eceran; Reparasi dan Perawatan Mobil dan Sepeda Motor Golongan Pokok Perdagangan, Reparasi dan Perawatan Mobil dan Sepeda Motor Bidang Teknik Sepeda Motor)",
        ringkasan: "Meliputi kompetensi pengelolaan tools, perawatan mesin, sistem kelistrikan, dan chassis sepeda motor konvensional.",
        units: [
            { kode_unit: "G.45TSM01.012.2", judul: "Melakukan Pengelolaan Tools" },
            { kode_unit: "G.45TSM01.020.2", judul: "Melakukan Perawatan Renggang Klep" },
            { kode_unit: "G.45TSM01.021.2", judul: "Melakukan Perawatan Free Play Throttle Gas" },
            { kode_unit: "G.45TSM01.022.2", judul: "Melakukan Perawatan Filter Udara" },
            { kode_unit: "G.45TSM01.023.2", judul: "Melakukan Perawatan Sistem Clutch/Kopling" },
            { kode_unit: "G.45TSM01.025.2", judul: "Melakukan Pemeriksaan Sistem Pelumasan Mesin" },
            { kode_unit: "G.45TSM01.026.2", judul: "Melakukan Perawatan Busi" },
            { kode_unit: "G.45TSM01.028.2", judul: "Melakukan Perawatan Sistem Pendinginan" },
            { kode_unit: "G.45TSM01.029.2", judul: "Melakukan Penggantian Rantai Roda" },
            { kode_unit: "G.45TSM01.031.2", judul: "Melakukan Perawatan Sistem Pengereman" },
            { kode_unit: "G.45TSM01.032.2", judul: "Melakukan Perawatan Sistem Kemudi" },
            { kode_unit: "G.45TSM01.033.2", judul: "Melakukan Perawatan Sistem Suspensi" },
            { kode_unit: "G.45TSM01.034.2", judul: "Melakukan Bongkar Pasang Cover Body" },
            { kode_unit: "G.45TSM01.039.2", judul: "Melakukan Perawatan Baterai" },
            { kode_unit: "G.45TSM01.040.2", judul: "Melakukan Perawatan Instrumen Kelistrikan (Sistem Sinyal dan Penerangan)" }
        ]
    },
    {
        judul: "Pemasangan Instalasi Listrik Bangunan Sederhana",
        deskripsi: "Skema Sertifikasi Klaster Pemasangan Instalasi Listrik Bangunan Sederhana (Keputusan Menteri Ketenagakerjaan Republik Indonesia Nomor 109 Tahun 2018 tanggal 25 Mei 2018 tentang Penetapan Standar Kompetensi Kerja Nasional Indonesia Kategori Industri Pengolahan Golongan Pokok Industri Mesin dan Perlengkapan Yang Tidak Dapat Diklasifikasikan Di Tempat Lain (YTDL) Bidang Industri Logam Mesin dan Keputusan Menteri Ketenagakerjaan Republik Indonesia Nomor 304 Tahun 2019 tanggal 18 Oktober 2019 tentang Penetapan Standar Kompetensi Kerja Nasional Indonesia Kategori Pengadaan Listrik, Gas, Uap/Air Panas dan Udara Dingin Golongan Pokok Pengadaan Listrik, Gas, Uap/Air Panas dan Udara Dingin Bidang Instalasi Pemanfaatan Tenaga Listrik)",
        ringkasan: "Meliputi kompetensi penerapan K3, pengukuran listrik, dan pemasangan instalasi listrik bangunan sederhana dan penangkal petir.",
        units: [
            { kode_unit: "C.28LOG20.003.2", judul: "Menerapkan Prinsip-prinsip K3 di Tempat Kerja" },
            { kode_unit: "C.28LOG12.002.2", judul: "Mengukur Listrik/Elektronik" },
            { kode_unit: "D.35.142.03.030.1", judul: "Melaksanakan Pembangunan dan Pemasangan Rangkaian Penangkal /Penangkap Petir" },
            { kode_unit: "D.35.142.00.002.1", judul: "Melaksanakan Pemasangan Komponen dan Sirkit Alat Pengukur dan Pembatas untuk Instalasi Pemanfaatan Tenaga Listrik" },
            { kode_unit: "D.35.144.00.002.1", judul: "Melaksanakan Pengoperasian Komponen dan Sirkit Alat Pengukur dan Pembatas untuk Instalasi Pemanfaatan Tenaga Listrik" },
            { kode_unit: "D.35.142.03.028.1", judul: "Melaksanakan Pembangunan dan Pemasangan Komponen dan Sirkit Instalasi Pemanfaatan Tenaga Listrik Tegangan Rendah" },
            { kode_unit: "D.35.144.03.028.1", judul: "Melaksanakan Pengoperasian Komponen dan Sirkit Instalasi Pemanfaatan Tenaga Listrik Tegangan Rendah" }
        ]
    },
    {
        judul: "Pengoperasian Mesin Bubut",
        deskripsi: "Skema Sertifikasi Klaster Pengoperasian Mesin Bubut (Keputusan Menteri Ketenagakerjaan Republik Indonesia Nomor 109 Tahun 2018 tanggal 25 Mei 2018 tentang Penetapan Standar Kompetensi Kerja Nasional Indonesia Kategori Industri Pengolahan Golongan Pokok Industri Mesin dan Perlengkapan Yang Tidak Dapat Diklasifikasikan Di Tempat Lain (YTDL) Bidang Industri Logam Mesin)",
        ringkasan: "Meliputi kompetensi penerapan K3, pengukuran, membaca gambar teknik, dan pengoperasian mesin bubut dasar.",
        units: [
            { kode_unit: "C.28LOG20.003.2", judul: "Menerapkan Prinsip-prinsip K3 di Tempat Kerja" },
            { kode_unit: "C.28LOG15.002.2", judul: "Menerapkan Prosedur Mutu" },
            { kode_unit: "C.28LOG12.008.2", judul: "Mengukur dengan Menggunakan Alat Ukur" },
            { kode_unit: "C.28LOG09.002.2", judul: "Membaca Gambar Teknik" },
            { kode_unit: "C.28LOG18.001.2", judul: "Menggunakan Perkakas Tangan" },
            { kode_unit: "C.28LOG07.005.2", judul: "Membubut Dasar" }
        ]
    }
];

async function fixAtlas() {
    console.log('========================================');
    console.log('       DB FIX: UPDATING ATLAS DATA      ');
    console.log('========================================');

    if (!ATLAS_URI) {
        console.error('❌ Error: MONGO_URI is not defined in .env');
        process.exit(1);
    }

    try {
        console.log(`\n📡 Connecting to ATLAS database...`);
        await mongoose.connect(ATLAS_URI);
        console.log('✅ Connected to Atlas DB');
    } catch (err) {
        console.error('❌ Failed to connect to Atlas DB:', err.message);
        process.exit(1);
    }

    let updatedCount = 0;

    for (const data of DATA_TO_UPDATE) {
        console.log(`\n🔍 Processing: ${data.judul}`);
        let skema = await Skema.findOne({ judul: data.judul });

        if (!skema) {
            console.log(`   ⚠️ Skema not found in Atlas. Creating it...`);
            skema = new Skema({
                judul: data.judul,
                jenis: 'Klaster', // Default assumption
                deskripsi: data.deskripsi,
                ringkasan: data.ringkasan
            });
            await skema.save();
        } else {
            console.log(`   📝 Found skema. Updating details...`);
            skema.deskripsi = data.deskripsi;
            skema.ringkasan = data.ringkasan;
            await skema.save();
        }

        // Update Units
        console.log(`   🔄 Updating units...`);
        // Remove existing units for this scheme to avoid duplicates/stale data
        await UnitKompetensi.deleteMany({ skema: skema._id });

        const unitsWithId = data.units.map(u => ({ ...u, skema: skema._id }));
        if (unitsWithId.length > 0) {
            await UnitKompetensi.insertMany(unitsWithId);
            console.log(`   ✅ Inserted ${unitsWithId.length} units.`);
        } else {
            console.log(`   ⚠️ No units provided for this scheme.`);
        }

        updatedCount++;
    }

    console.log('\n========================================');
    console.log(`🎉 Fix completed! Updated ${updatedCount} schemes.`);
    console.log('========================================');

    await mongoose.disconnect();
    process.exit(0);
}

fixAtlas().catch(error => {
    console.error('\n❌ Fix failed:', error);
    process.exit(1);
});
