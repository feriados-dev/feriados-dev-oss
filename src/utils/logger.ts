import winston from 'winston';
import { existsSync, mkdirSync } from 'fs';
import { config } from '@config/env';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let metaStr = '';
    if (Object.keys(meta).length > 0) {
      metaStr = JSON.stringify(meta, null, 2);
    }
    return `${timestamp} [${level}]: ${message} ${metaStr}`;
  })
);

const consoleLogFormat = config.env === 'development' ? consoleFormat : logFormat;

const transports: winston.transport[] = [
  new winston.transports.Console({ format: consoleLogFormat }),
];

const exceptionHandlers: winston.transport[] = [
  new winston.transports.Console({ format: consoleLogFormat }),
];

if (!existsSync('logs')) mkdirSync('logs');

transports.push(
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    maxsize: 5242880,
    maxFiles: 5,
  }),
  new winston.transports.File({
    filename: config.logging.file,
    maxsize: 5242880,
    maxFiles: 5,
  }),
);

exceptionHandlers.push(
  new winston.transports.File({ filename: 'logs/exceptions.log' }),
);

export const logger = winston.createLogger({
  level: config.logging.level,
  format: logFormat,
  transports,
  exceptionHandlers,
  rejectionHandlers: exceptionHandlers,
});
