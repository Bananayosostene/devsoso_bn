import dotenv from 'dotenv';

dotenv.config(); 

const mongoDbConfig = {
  development: process.env.DEV_DATABASE_URL,
  test: process.env.TEST_DATABASE_URL,
  production: process.env.PROD_DATABASE_URL,
};

const APP_MODE = process.env.NODE_ENV || 'development';

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
