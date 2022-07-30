import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ValidateJWTTokenService } from '@modules/auth/services/ValidateJWTTokenService';
import { AppError } from '@shared/errors/AppError';

async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const authBearer = request.headers.authorization;

  if (!authBearer) {
    throw new AppError('JWT token is missing!', 401);
  }

  const [, token] = authBearer.split(' ');

  try {
    const validateJWTTokenService = container.resolve(ValidateJWTTokenService);

    const { isValid, payload, code } = await validateJWTTokenService.execute({
      token,
    });

    if (!isValid) {
      throw new AppError('Invalid JWT token!', 401, code);
    }

    if (payload) {
      request.user = {
        id: Number(payload.sub),
        name: payload.name,
        email: payload.email,
      };
    }

    return next();
  } catch (err) {
    console.info(err);
    throw err;
  }
}

export { ensureAuthenticated };
