
import mongoose from 'mongoose';
import { getMongoUri } from './config';

const connectDb = async (): Promise<void> => {
  try {
    const MONGO_URI = getMongoUri();
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDb;