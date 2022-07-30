import 'reflect-metadata';
import 'dotenv/config';
import '@shared/containers';

import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import jsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

import 'express-async-errors';

import { configureAdminBro } from '@config/adminBro';
import { configureSentry } from '@config/sentry';
import { definitions, options } from '@docs/swaggerConfigurations';
import { handler } from '@shared/errors/Handler';

import { connect } from '../typeorm';
import { log } from './middlewares/log';
// import { rateLimiter } from './middlewares/rateLimiter';
import { routes } from './routes';

const app = express();

const server = http.createServer(app);

const io = new Server(server, { cors: { origin: process.env.APP_WEB_URL } });

connect();

async function start(): Promise<void> {
  const { NODE_ENV } = process.env;

  const { rootPath, router } = await configureAdminBro();

  // Sentry
  await configureSentry({ app });

  // Logs
  app.use(log);

  // Rate Limit
  // app.use(rateLimiter);

  // Configurations
  app.use(cors());
  app.use(express.json());

  // Rotas
  app.use(routes);

  // AdminBro
  app.use(rootPath, router);

  // Swagger
  app.use('/api/docs', serve, setup(jsdoc(definitions), options));

  const url = NODE_ENV === 'develop' ? '/' : '/api';

  app.use(url, (_, response) => response.redirect('/api/docs/swagger.json'));

  // Errors
  app.use(handler);
}

start();

export { server, io };
