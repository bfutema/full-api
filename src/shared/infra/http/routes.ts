import { Router } from 'express';

import { authRoutes } from '@modules/auth/app/http/routes/auth.routes';
import { usersRoutes } from '@modules/users/app/http/routes/users.routes';

import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', usersRoutes);

if (process.env.NODE_ENV !== 'testing') routes.use(ensureAuthenticated);

export { routes };
