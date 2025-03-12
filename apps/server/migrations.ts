import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

async function runMigrations() {
    await mongoose.connect(process.env.MONGODB_URI as string);


    await User.updateMany({}, { $unset: { name: '' } });


    // await User.updateMany({}, { $set: { role: 'user' } });

    ('Migrations completed');
    await mongoose.disconnect();
}

runMigrations().catch((error) => console.error('Error running migrations:', error));
