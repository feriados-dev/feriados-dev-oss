import { Request, Response, NextFunction } from 'express';
import { AppError } from '@utils/errors';
import { logger } from '@utils/logger';
import { ZodError } from 'zod';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error('Request error', {
    error: error.message,
    stack: error.stack,
    method: req.method,
    path: req.path,
    ip: req.ip,
  });

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      code: 'VALIDATION_ERROR',
      errors: error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  // Handle custom AppError
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      code: error.code,
      details: error.details,
    });
  }

  // Handle database errors
  if (error.name === 'QueryFailedError') {
    return res.status(500).json({
      status: 'error',
      message: 'Database error',
      code: 'DATABASE_ERROR',
    });
  }

  // Default error
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    code: 'INTERNAL_ERROR',
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.path} not found`,
    code: 'NOT_FOUND',
  });
};
