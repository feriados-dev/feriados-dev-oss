export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad Request', code?: string, details?: unknown) {
    super(400, message, code, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', code?: string) {
    super(401, message, code);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', code?: string) {
    super(403, message, code);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', code?: string) {
    super(404, message, code);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict', code?: string, details?: unknown) {
    super(409, message, code, details);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = 'Too many requests', code?: string) {
    super(429, message, code);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error', code?: string) {
    super(500, message, code);
  }
}
