import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

import { AppError } from '@shared/errors/AppError';

const redisClient = redis.createClient({
  host: process.env.REDIS_DB_HOST,
  port: process.env.REDIS_DB_PORT,
  password: process.env.REDIS_DB_PASS,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimit',
  points: 5,
  duration: 1,
});

async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const isSwagger = request.path.startsWith('/api/docs');
    const isAdminBro = request.path.startsWith('/admin');

    if (isSwagger || isAdminBro) return next();

    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError('Too many requests!', 429);
  }
}

export { rateLimiter };
