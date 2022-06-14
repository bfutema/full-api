export const redisConfig = {
  host: process.env.REDIS_DB_HOST,
  port: Number(process.env.REDIS_DB_PORT),
  password: process.env.REDIS_DB_PASS,
};
