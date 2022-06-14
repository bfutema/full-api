import { Router } from 'express';

import { usersRoutes } from '@modules/users/app/http/routes/users.routes';

const routes = Router();

routes.use('/users', usersRoutes);

export { routes };
