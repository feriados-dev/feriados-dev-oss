import { Pool, PoolConfig } from 'pg';
import { config } from './env';
import { logger } from '@utils/logger';

function shouldUseSsl(connectionString: string): boolean {
  return !connectionString.includes('localhost') &&
    !connectionString.includes('127.0.0.1') &&
    !connectionString.includes('postgres') &&
    !connectionString.includes('sslmode=disable');
}

const poolConfig: PoolConfig = config.db.url
  ? {
      connectionString: config.db.url,
      max: 5,
      idleTimeoutMillis: 0,
      connectionTimeoutMillis: 10000,
      ssl: shouldUseSsl(config.db.url) ? { rejectUnauthorized: true } : false,
    }
  : {
      host: config.db.host,
      port: config.db.port,
      database: config.db.name,
      user: config.db.user,
      password: config.db.password,
      min: config.db.poolMin,
      max: config.db.poolMax,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      ssl: config.env === 'production' ? { rejectUnauthorized: true } : false,
    };

export const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  logger.error('Unexpected error on idle database client', err);
});

export const testConnection = async (): Promise<boolean> => {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    logger.info('Database connection established successfully');
    return true;
  } catch (error) {
    logger.error('Failed to connect to database', error);
    return false;
  }
};

export const query = async (text: string, params?: unknown[]) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug('Executed query', { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    logger.error('Query error', { text, error });
    throw error;
  }
};

export const closePool = async (): Promise<void> => {
  try {
    await pool.end();
    logger.info('Database pool closed');
  } catch (error) {
    logger.error('Error closing database pool', error);
    throw error;
  }
};
