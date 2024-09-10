// db.config.ts
import mongoose from 'mongoose';
import { getMongoUri } from './config'; // Import the config with the URI getter

// Retrieve the MongoDB URI
const MONGO_URI = getMongoUri();

/**
 * Connect to MongoDB using Mongoose
 */
const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDb;
