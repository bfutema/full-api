import { container } from 'tsyringe';

import { UsersTokensRepository } from '@modules/auth/app/typeorm/repositories/UsersTokensRepository';
import { IUsersTokensRepository } from '@modules/auth/repositories/IUsersTokensRepository';

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);
