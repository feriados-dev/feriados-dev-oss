import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  API_VERSION: z.string().default('v1'),

  // Database
  DB_HOST: z.string().default('postgres'),
  DB_PORT: z.string().transform(Number).default('5432'),
  DB_NAME: z.string().default('feriados'),
  DB_USER: z.string().default('feriados'),
  DB_PASSWORD: z.string().default('feriados'),
  DB_POOL_MIN: z.string().transform(Number).default('2'),
  DB_POOL_MAX: z.string().transform(Number).default('10'),
  DATABASE_URL: z.string().optional(),

  // Local in-memory cache
  CACHE_TTL: z.string().transform(Number).default('3600'),

  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  LOG_FILE: z.string().default('logs/app.log'),

  // Swagger
  SWAGGER_ENABLED: z.string().transform(val => val === 'true').default('true'),
});

const env = envSchema.parse(process.env);

export const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  apiVersion: env.API_VERSION,

  db: {
    url: env.DATABASE_URL,
    host: env.DB_HOST,
    port: env.DB_PORT,
    name: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    poolMin: env.DB_POOL_MIN,
    poolMax: env.DB_POOL_MAX,
  },

  cache: {
    cacheTtl: env.CACHE_TTL,
  },

  logging: {
    level: env.LOG_LEVEL,
    file: env.LOG_FILE,
  },

  swagger: {
    enabled: env.SWAGGER_ENABLED,
  },
} as const;
