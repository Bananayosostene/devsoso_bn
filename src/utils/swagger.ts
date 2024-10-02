import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import { PORT } from '../config';

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My simple website',
      version: '1.0.0',
      description: 'Documentation for the portfolio API',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Local Server',
      },
      {
        url: 'https://deployed.com',
        description: 'Deployed Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/docs/*.ts'],  
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
