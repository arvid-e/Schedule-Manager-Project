import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        throw Error('MONGO_URI not found!')
    }
    console.log('Waiting for MongoDB...')
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected.');


  } catch (err: any) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};


