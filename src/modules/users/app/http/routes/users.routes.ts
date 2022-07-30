import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { UsersController } from '../controllers/UsersController';

const usersRoutes = Router();

usersRoutes.get('/', ensureAuthenticated, UsersController.index);
usersRoutes.post('/', UsersController.create);
usersRoutes.get('/:id', ensureAuthenticated, UsersController.show);
usersRoutes.put('/:id', ensureAuthenticated, UsersController.update);
usersRoutes.delete('/:id', ensureAuthenticated, UsersController.delete);

export { usersRoutes };
