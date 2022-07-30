import { NextFunction, Request, Response } from 'express';
import { EntityColumnNotFound, FindRelationsNotFoundError } from 'typeorm';

import { AppError } from './AppError';

function handler(
  err: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response {
  if (!(err instanceof AppError)) console.info(err);

  if (err instanceof FindRelationsNotFoundError) {
    return response.status(400).json({
      type: 'FindRelationsNotFoundError',
      message: err.message,
    });
  }

  if (err instanceof EntityColumnNotFound) {
    return response.status(400).json({
      type: err.name,
      message: err.message,
    });
  }

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      code: err.code,
      message: err.message,
    });
  }

  if (process.env.NODE_ENV === 'production') {
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }

  return response.status(500).json(err);
}

export { handler };
