import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { io } from '@shared/infra/http/app';

import { ILogoutRequest } from '../contracts/IAuthenticationDTO';
import { IUsersTokensRepository } from '../repositories/IUsersTokensRepository';

@injectable()
class LogoutUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepo: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepo: IUsersTokensRepository,
  ) {}

  public async execute({ user_id }: ILogoutRequest): Promise<void> {
    const foundedUser = await this.usersRepo.findById(user_id);

    if (!foundedUser) {
      throw new AppError('User not found!', 404);
    }

    await this.usersTokensRepo.deleteByUserId(user_id);

    io.emit('online', { user_id: foundedUser.id, status: 'offline' });
  }
}

export { LogoutUserService };
