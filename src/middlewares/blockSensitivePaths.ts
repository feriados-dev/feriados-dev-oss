import { Request, Response, NextFunction } from 'express';
import { logger } from '@utils/logger';

const BLOCKED_PATHS = [
  /^\/\.git\//i,
  /^\/\.env(\.|$)/i,
  /^\/\.env\.local/i,
  /^\/wp-/i,
  /^\/wp\.php/i,
  /^\/xmlrpc\.php/i,
  /^\/phpmyadmin/i,
  /^\/admin\/?(config|setup|install)/i,
  /\.php$/i,
  /\.asp(x?)$/i,
  /\.jsp$/i,
];

export const blockSensitivePathsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const path = req.path.toLowerCase();

  if (BLOCKED_PATHS.some((pattern) => pattern.test(path))) {
    logger.warn('Blocked sensitive path scan', {
      ip: req.ip,
      path: req.path,
      method: req.method,
    });
    res.status(404).end();
    return;
  }

  next();
};
