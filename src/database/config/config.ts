import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.DEV_DATABASE_URL;

if (!MONGO_URI) {
  throw new Error('MongoDB URI not found. Please set DEV_DATABASE_URL in your environment variables.');
}

export const getMongoUri = (): string => MONGO_URI;



// import dotenv from 'dotenv';

// dotenv.config(); 

// const mongoDbConfig = {
//   development: process.env.DEV_DATABASE_URL,
//   test: process.env.TEST_DATABASE_URL,
//   production: process.env.PROD_DATABASE_URL,
// };

// const APP_MODE = process.env.NODE_ENV || 'development';

// export const getMongoUri = (): string => {
//   switch (APP_MODE) {
//     case 'test':
//       return mongoDbConfig.test || '';
//     case 'production':
//       return mongoDbConfig.production || '';
//     default:
//       return mongoDbConfig.development || '';
//   }
// };
