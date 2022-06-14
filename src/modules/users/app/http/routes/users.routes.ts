import { Router } from 'express';

import { UsersController } from '../controllers/UsersController';

const usersRoutes = Router();

usersRoutes.get('/', UsersController.index);
usersRoutes.post('/', UsersController.create);
usersRoutes.get('/:id', UsersController.show);
usersRoutes.put('/:id', UsersController.update);
usersRoutes.delete('/:id', UsersController.delete);

export { usersRoutes };
