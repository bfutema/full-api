import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { Express } from 'express';

async function configureSentry({ app }: { app: Express }): Promise<void> {
  Sentry.init({
    dsn: 'https://b1dfd99e329b4d989fe56745c8ff7dac@o323488.ingest.sentry.io/6495930',
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.use(Sentry.Handlers.errorHandler());
}

export { configureSentry };
