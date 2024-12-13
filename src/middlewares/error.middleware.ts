import { Request } from 'express';
import path from 'path';
import { TypedResponse } from '@/types/http.types';
import { ErrorResponse, HttpStatusCode, HttpException } from '@/types/error.types';
import { config } from '@/config/env.config';

export const notFoundHandler = (
  req: Request,
  res: TypedResponse<ErrorResponse>
): void => {
  const response: ErrorResponse = {
    success: false,
    status: HttpStatusCode.NOT_FOUND,
    message: 'Resource not found'
  };

  // For API requests, send JSON response
  if (req.get('Accept') === 'application/json') {
    res.status(HttpStatusCode.NOT_FOUND).json(response);
    return;
  }

  // For browser requests, send HTML
  res.status(HttpStatusCode.NOT_FOUND)
    .sendFile(path.join(process.cwd(), 'public', 'page', 'page-not-found.html'));
};

export const errorHandler = (
  err: HttpException,
  req: Request,
  res: TypedResponse<ErrorResponse>
): void => {
  const status = err.status || HttpStatusCode.INTERNAL_SERVER;
  const message = err.message || 'Internal server error';

  const response: ErrorResponse = {
    success: false,
    status,
    message,
    error: err.error,
    ...(config.server.isDevelopment && { stack: err.stack })
  };

  // Log error for debugging
  console.error(`[Error] ${status}: ${message}`, {
    error: err.error,
    stack: err.stack
  });

  // For API requests, send JSON response
  if (req.get('Accept') === 'application/json') {
    res.status(status).json(response);
    return;
  }

  // For browser requests, send HTML
  res.status(status)
    .sendFile(path.join(process.cwd(), 'public', 'page', 'server-error.html'));
};
