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
    { judul: "Teknik Otomotif", deskripsi: "Menjadi teknisi handal dalam perawatan dan perbaikan kendaraan ringan sesuai standar industri.", gambar: "https://placehold.co/400x250/3b82f6/ffffff?text=Otomotif" },
    { judul: "Desain Grafis", deskripsi: "Menguasai pembuatan materi visual untuk branding, marketing, dan media cetak maupun digital.", gambar: "https://placehold.co/400x250/8b5cf6/ffffff?text=Desain+Grafis" },
    { judul: "Manajemen Perkantoran", deskripsi: "Meningkatkan keahlian dalam administrasi dan manajemen perkantoran yang efisien dan modern.", gambar: "https://placehold.co/400x250/ec4899/ffffff?text=Perkantoran" },
    { judul: "Teknik Las", deskripsi: "Sertifikasi untuk juru las profesional dengan berbagai posisi pengelasan sesuai standar industri manufaktur.", gambar: "https://placehold.co/400x250/f97316/ffffff?text=Teknik+Las" },
    { judul: "Pemrograman Komputer", deskripsi: "Mengembangkan aplikasi perangkat lunak berbasis desktop atau web dengan bahasa pemrograman populer.", gambar: "https://placehold.co/400x250/14b8a6/ffffff?text=Programming" },
    { judul: "Tata Boga", deskripsi: "Menjadi profesional di bidang kuliner dengan keahlian mengolah masakan nusantara dan internasional.", gambar: "https://placehold.co/400x250/ef4444/ffffff?text=Tata+Boga" }
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
        const skemaCount = await SkemaSeed.countDocuments();
        if (skemaCount === 0) {
            console.log('Tidak ada data skema, melakukan seeding...');
            await SkemaSeed.insertMany(SKEMA_DATA);
            console.log('Seeding data skema berhasil.');
        } else {
            console.log('Data skema sudah ada, seeding dilewati.');
        }

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