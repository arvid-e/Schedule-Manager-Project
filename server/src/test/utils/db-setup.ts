import mongoose from 'mongoose';
import User from '@app/models/user.model';

// Ensure your test DB URI is defined in your .env.test or test environment config
const TEST_DB_URI = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/app-test-db';

export const connectTestDB = async (): Promise<void> => {
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(TEST_DB_URI);
            console.log(`Connected to test MongoDB: ${TEST_DB_URI}`);
        } catch (error) {
            console.error(`Failed to connect to test MongoDB: ${error}`);
            process.exit(1);
        }
    }
};

export const disconnectTestDB = async (): Promise<void> => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
        console.log('Disconnected from test MongoDB.');
    }
};

export const clearTestDB = async (): Promise<void> => {
    if (mongoose.connection.readyState === 1) {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({}); // Clear all documents in each collection
        }
        console.log('Test database cleared.');
    }
};

export const seedTestDB = async (): Promise<void> => {
    // Example: Seed a user for login tests
    const hashedPassword = await (import('bcryptjs') as any).hash('testpassword123', 10); // Hash password for seeding
    await User.create({
        username: 'seededuser',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    console.log('Test database seeded with initial data.');
};