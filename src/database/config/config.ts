// config.ts
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Define MongoDB connection URIs for different environments
const mongoDbConfig = {
  development: process.env.DEV_DATABASE_URL,
  test: process.env.TEST_DATABASE_URL,
  production: process.env.PROD_DATABASE_URL,
};

// Set the application mode (development, test, production)
const APP_MODE = process.env.NODE_ENV || 'development';

// Function to retrieve the appropriate MongoDB URI based on the environment
export const getMongoUri = (): string => {
  switch (APP_MODE) {
    case 'test':
      return mongoDbConfig.test || '';
    case 'production':
      return mongoDbConfig.production || '';
    default:
      return mongoDbConfig.development || '';
  }
};
