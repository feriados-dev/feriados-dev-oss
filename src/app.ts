import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import { blockSensitivePathsMiddleware } from '@middlewares/blockSensitivePaths';
import { errorHandler, notFoundHandler } from '@middlewares/errorHandler';
import routes from '@routes/index';
import { logger } from '@utils/logger';
import { swaggerDocument } from '@config/swagger';
import { config } from '@config/env';

export const createApp = (): Application => {
  const app = express();

  app.set('trust proxy', 1);

  app.use(blockSensitivePathsMiddleware);
  app.use(helmet());
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());

  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.info('Request completed', {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        duration,
        ip: req.ip,
      });
    });
    next();
  });

  if (config.swagger.enabled) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  app.use(routes);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
