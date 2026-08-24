import { Request, Response } from 'express';
import { pool } from '@config/database';
import { logger } from '@utils/logger';

export class HealthController {
  async getHealth(_req: Request, res: Response): Promise<void> {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      services: {
        database: await this.checkDatabase(),
      },
    };

    const isHealthy = health.services.database;
    const statusCode = isHealthy ? 200 : 503;

    if (!isHealthy) {
      health.status = 'unhealthy';
    }

    res.status(statusCode).json(health);
  }

  async getReadiness(_req: Request, res: Response): Promise<void> {
    const dbReady = await this.checkDatabase();

    res.status(dbReady ? 200 : 503).json({
      ready: dbReady,
      services: {
        database: dbReady,
      },
    });
  }

  async getLiveness(_req: Request, res: Response): Promise<void> {
    res.status(200).json({
      alive: true,
      timestamp: new Date().toISOString(),
    });
  }

  private async checkDatabase(): Promise<boolean> {
    try {
      const client = await pool.connect();
      await client.query('SELECT 1');
      client.release();
      return true;
    } catch (error) {
      logger.error('Database health check failed', error);
      return false;
    }
  }
}

export const healthController = new HealthController();
