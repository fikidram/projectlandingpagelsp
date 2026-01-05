const mongoose = require('mongoose');
require('dotenv').config();

const Skema = require('./models/Skema');
const Jadwal = require('./models/Jadwal');
const UnitKompetensi = require('./models/UnitKompetensi');

const LOCAL_URI = 'mongodb://localhost:27017/lsp-bpvp-aceh';
const ATLAS_URI = process.env.MONGO_URI;

async function migrate() {
    console.log('========================================');
    console.log('       DB MIGRATION: LOCAL -> ATLAS     ');
    console.log('========================================');

    if (!ATLAS_URI) {
        console.error('❌ Error: MONGO_URI is not defined in .env');
        process.exit(1);
    }

    // STEP 1: READ FROM LOCAL
    console.log(`\n📡 Connecting to LOCAL database...`);
    try {
        await mongoose.connect(LOCAL_URI);
        console.log('✅ Connected to Local DB');
    } catch (err) {
        console.error('❌ Failed to connect to local DB:', err.message);
        process.exit(1);
    }

    console.log('📥 Reading data from local collections...');
    const skemas = await Skema.find({});
    const jadwals = await Jadwal.find({});
    const units = await UnitKompetensi.find({});
    console.log(`   - Skema: ${skemas.length} items`);
    console.log(`   - Jadwal: ${jadwals.length} items`);
    console.log(`   - UnitKompetensi: ${units.length} items`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected from Local DB');

    // STEP 2: WRITE TO ATLAS
    console.log(`\n📡 Connecting to ATLAS database...`);
    try {
        await mongoose.connect(ATLAS_URI);
        console.log('✅ Connected to Atlas DB');
    } catch (err) {
        console.error('❌ Failed to connect to Atlas DB:', err.message);
        process.exit(1);
    }

    console.log('🧹 Clearing existing data in Atlas...');
    await Skema.deleteMany({});
    await Jadwal.deleteMany({});
    await UnitKompetensi.deleteMany({});
    console.log('   - Collections cleared');

    console.log('📤 Inserting local data into Atlas...');

    if (skemas.length > 0) {
        await Skema.insertMany(skemas);
        console.log(`   ✅ Inserted ${skemas.length} Skema`);
    }

    if (jadwals.length > 0) {
        await Jadwal.insertMany(jadwals);
        console.log(`   ✅ Inserted ${jadwals.length} Jadwal`);
    }

    if (units.length > 0) {
        await UnitKompetensi.insertMany(units);
        console.log(`   ✅ Inserted ${units.length} UnitKompetensi`);
    }

    console.log('\n🎉 Migration completed successfully!');
    await mongoose.disconnect();
    process.exit(0);
}

migrate().catch(error => {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
});
