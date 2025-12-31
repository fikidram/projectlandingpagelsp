require('dotenv').config();
const mongoose = require('mongoose');
const seedDatabase = require('./seed');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lsp-bpvp-aceh';

const runSeed = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB.');

        await seedDatabase();

        console.log('Seeding completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

runSeed();
