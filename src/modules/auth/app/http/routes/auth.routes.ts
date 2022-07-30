import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { AuthController } from '../controllers/AuthController';

const authRoutes = Router();

authRoutes.post('/', AuthController.create);
authRoutes.delete('/', ensureAuthenticated, AuthController.delete);

export { authRoutes };
