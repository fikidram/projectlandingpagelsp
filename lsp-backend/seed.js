/*
================================================================================
File: seed.js
================================================================================
Deskripsi:
- File ini berisi fungsi untuk mengisi database dengan data awal (seeding).
- Ini berguna agar saat pertama kali dijalankan, aplikasi sudah memiliki konten.
- Fungsi ini akan memeriksa apakah data sudah ada sebelum menambahkan.
*/

const SkemaSeed = require('./models/Skema');
const JadwalSeed = require('./models/Jadwal');

const SKEMA_DATA = [
    { jenis: "Okupasi", judul: "Plate Welder SMAW 2G/PC" },
    { jenis: "Klaster", judul: "Service Sepeda Motor Konvensional" },
    { jenis: "Klaster", judul: "Pemasangan Instalasi Listrik Bangunan Sederhana" },
    { jenis: "Klaster", judul: "Pengoperasian Mesin Bubut" },
    { jenis: "Okupasi", judul: "Teknisi Refrigerasi Domestik" },
    { jenis: "Klaster", judul: "Pembuatan Sampel Garmen" },
    { jenis: "Klaster", judul: "Pembuatan Hiasan Busana dengan Mesin Bordir Manual" },
    { jenis: "Klaster", judul: "Menjahit Pakaian dengan Mesin" },
    { jenis: "Okupasi", judul: "Asisten Pembuat Pakaian" },
    { jenis: "Okupasi", judul: "Juru Ukur (Surveyor)" },
    { jenis: "Klaster", judul: "Mengerjakan Finishing dengan Teknik Oles" },
    { jenis: "Okupasi", judul: "Plate Welder GTAW 2G/PC" },
    { jenis: "Klaster", judul: "Service Sepeda Motor Injeksi" },
    { jenis: "Klaster", judul: "Pemeliharaan Kendaraan Ringan Sistem Injeksi" },
    { jenis: "Klaster", judul: "Perakitan Komputer" },
    { jenis: "Okupasi", judul: "Teknisi Perawatan AC Residential" },
    { jenis: "Okupasi", judul: "Teknisi Audio Video" },
    { jenis: "Klaster", judul: "Menjahit dengan Mesin Lockstitch" },
    { jenis: "Okupasi", judul: "Barista" },
    { jenis: "Klaster", judul: "Pembuatan Roti dan Kue" },
    { jenis: "Klaster", judul: "Pemrograman Web" },
    { jenis: "Klaster", judul: "Pembuatan Desain Grafis" },
    { jenis: "Klaster", judul: "Pemasangan Jaringan Komputer" },
    { jenis: "Klaster", judul: "Multimedia" },
    { jenis: "Okupasi", judul: "Plate Welder 3G-Up/PF" },
    { jenis: "Okupasi", judul: "Pipe Welder SMAW 6G-Up Hill/HLO-45" },
    { jenis: "Klaster", judul: "Perbaikan Body Kendaraan Ringan" },
    { jenis: "Klaster", judul: "Tune Up Sepeda Motor Konvensional" },
    { jenis: "Klaster", judul: "Spooring Balancing Kendaraan Ringan" },
    { jenis: "Klaster", judul: "Penggambaran Model 3D dengan CAD" },
    { jenis: "Okupasi", judul: "Juru Gambar Arsitektur" },
    { jenis: "Klaster", judul: "Pengoperasian Instalasi Kontrol Industri Berbasis PLC" },
    { jenis: "Okupasi", judul: "Asisten Teknisi Refrigerasi dan AC (RAC)" },
    { jenis: "Klaster", judul: "Pemeliharaan dan Perbaikan AC untuk Rumah Tangga" },
    { jenis: "Okupasi", judul: "Teknisi Telepon Seluler Perangkat Keras" },
    { jenis: "Klaster", judul: "Menjahit Bed Cover" },
    { jenis: "Klaster", judul: "Pelayanan Pelanggan" },
    { jenis: "Okupasi", judul: "Pengelola Administrasi Perkantoran" },
    { jenis: "Klaster", judul: "Perancang Desain Busana" },
    { jenis: "Klaster", judul: "Digital Marketing" },
    { jenis: "Klaster", judul: "Pemrograman Berbasis Data" },
    { jenis: "Klaster", judul: "Pembuatan Gerak Animasi 3D (Animator)" },
    { jenis: "Klaster", judul: "Mobile Programming" },
    { jenis: "Klaster", judul: "IT Software Solution for Business" },
    { jenis: "Okupasi", judul: "Teknisi AC Residential" },
    { jenis: "Klaster", judul: "Pengoperasian Sistem Kontrol Kelistrikan dan Pnuematik Berbasis PLC" },
    { jenis: "Klaster", judul: "Pembuatan Program Sistem Kontrol Listrik dan Pnuematik Berbasis PLC" },
    { jenis: "Klaster", judul: "Pemasangan Pembangkit Listrik Tenaga Surya Off Grid" },
    { jenis: "Klaster", judul: "Pemasangan Instalasi Otomasi Listrik Industri" },
    { jenis: "Klaster", judul: "Instalasi Fiber Optik" },
    { jenis: "Klaster", judul: "Pemrograman Embedded System Berbasis IoT" },
    { jenis: "Okupasi", judul: "Fillet Welder SMAW 2F/PB" },
    { jenis: "Klaster", judul: "Mengerjakan Pembahanan (Rough Mill)" },
    { jenis: "Okupasi", judul: "Estimator Bangunan Gedung" },
    { jenis: "Klaster", judul: "Pembuatan Konten Digital" },
    { jenis: "Klaster", judul: "Pengolahan Buah" },
    { jenis: "Klaster", judul: "Pengolahan Ikan" },
    { jenis: "Klaster", judul: "Penyangraian Biji Kopi" },
    { jenis: "Okupasi", judul: "Teknisi Pembangkit Listrik Tenaga Surya (Instalasi, Operasi dan Pemeliharaan)" },
    { jenis: "Okupasi", judul: "Desainer Grafis Muda" },
    { jenis: "Okupasi", judul: "Advance Office Operator" },
    { jenis: "Okupasi", judul: "Basic Office Operator" },
    { jenis: "Klaster", judul: "English For Junior Administrative Assistant" },
    { jenis: "Klaster", judul: "RAB Pekerjaan Bangunan" },
    { jenis: "Okupasi", judul: "Juru Gambar Bangunan Gedung Jenjang 4" },
    { jenis: "-", judul: "English For Front Liner" },
    { jenis: "Okupasi", judul: "Tukang Pangkas Rambut" },
    { jenis: "Okupasi", judul: "Instruktur Terampil" },
    { jenis: "Klaster", judul: "Bakery" },
    { jenis: "Okupasi", judul: "Fillet Welder SMAW 3F/PF" },
    { jenis: "Kualifikasi", judul: "Junior Fashion Designer (Kualifikasi 4)" },
    { jenis: "Okupasi", judul: "Video Editor" },
    { jenis: "Okupasi", judul: "Fotografer Junior" },
    { jenis: "Klaster", judul: "Menjahit Kebaya" },
    { jenis: "Klaster", judul: "Penerapan Alat Teknik dan Metode Peningkatan Produktivitas" },
    { jenis: "Klaster", judul: "Peningkatan Produktivitas" },
    { jenis: "Okupasi", judul: "Operator Pengoperasian dan Pemeliharaan Pembangkit Listrik Tenaga Mikro Hidro" },
    { jenis: "Okupasi", judul: "Teknisi Instalasi Tenaga" },
    { jenis: "Klaster", judul: "Pemasangan Pembangkit Listrik Tenaga Surya On-Grid" },
    { jenis: "Okupasi", judul: "Plate Welder SMAW 4G/PE" },
    { jenis: "Okupasi", judul: "Plate Welder GTAW 3G UP/PF" },
    { jenis: "Klaster", judul: "Menjahit Pakaian Sesuai Style" },
    { jenis: "Klaster", judul: "Menjahit Pakaian Wanita Dewasa" },
    { jenis: "Klaster", judul: "Pengelolaan Pakan Ikan Dengan Smart Feeder System" },
    { jenis: "Klaster", judul: "Otomatisasi Pencampuran Nutrisi Hidroponik dengan Smart Nutrition System" },
    { jenis: "-", judul: "Teknisi Embedded System (Microcontroller)" },
    { jenis: "Okupasi", judul: "Asisten Junior Designer" },
    { jenis: "Okupasi", judul: "Pipe Welder SMAW 5G-Up Hill/PF" },
    { jenis: "Klaster", judul: "Housekeeping" },
    { jenis: "Klaster", judul: "Pemasangan Sistem Integrasi Bangunan Cerdas" },
    { jenis: "Klaster", judul: "Pengelolaan Administrasi Kantor Digital Berbasis Google Workspace" },
    { jenis: "Klaster", judul: "Pembuatan Sistem Informasi Pariwisata Berbasis Website" },
    { jenis: "Klaster", judul: "Pengoperasian Tools Generative Artificial Intelligence (AI) untuk Konten Digital dan Bisnis" },
    { jenis: "Klaster", judul: "Pengembangan Web dengan Node.js dan React" },
    { jenis: "Klaster", judul: "Pembuatan Konten Visual Untuk Sosial Media" },
    { jenis: "Klaster", judul: "Optimalisasi Pemasaran Melalui Media Sosial" },
    { jenis: "Klaster", judul: "Otomatisasi Pencampuran Nutrisi Hidroponik dengan Smart Nutrition System" },
    { jenis: "Klaster", judul: "Pengelolaan Sistem Irigasi Menggunakan Smart Farming System" },
    { jenis: "Okupasi", judul: "Quantity Surveyor Madya" },
    { jenis: "Klaster", judul: "Pembuatan Perabotan Menggunakan High Pressure Laminate (HPL) Sederhana" },
    { jenis: "Klaster", judul: "Peracikan Minuman Kopi" },
    { jenis: "Okupasi", judul: "Juru Ukur Konstruksi" }
];

const JADWAL_DATA = [
    { nama: "Teknik Otomotif", tanggal: "15 - 17 Agustus 2025", lokasi: "TUK Otomotif BPVP Banda Aceh", status: "Dibuka", statusColor: "green" },
    { nama: "Desain Grafis", tanggal: "20 - 22 Agustus 2025", lokasi: "TUK Komputer BPVP Banda Aceh", status: "Dibuka", statusColor: "green" },
    { nama: "Manajemen Perkantoran", tanggal: "25 - 26 Agustus 2025", lokasi: "TUK Administrasi BPVP Banda Aceh", status: "Segera Penuh", statusColor: "yellow" },
    { nama: "Teknik Las", tanggal: "10 - 14 Juli 2025", lokasi: "TUK Las BPVP Banda Aceh", status: "Ditutup", statusColor: "red" }
];

const seedDatabase = async () => {
    try {
        // Seed Skema
        console.log('Menghapus data skema lama...');
        await SkemaSeed.deleteMany({}); // Delete all existing skemas

        console.log('Menambahkan data skema baru...');
        await SkemaSeed.insertMany(SKEMA_DATA);
        console.log('Seeding data skema berhasil.');

        // Seed Jadwal
        const jadwalCount = await JadwalSeed.countDocuments();
        if (jadwalCount === 0) {
            console.log('Tidak ada data jadwal, melakukan seeding...');
            await JadwalSeed.insertMany(JADWAL_DATA);
            console.log('Seeding data jadwal berhasil.');
        } else {
            console.log('Data jadwal sudah ada, seeding dilewati.');
        }
    } catch (error) {
        console.error('Error saat seeding database:', error);
    }
};

module.exports = seedDatabase;