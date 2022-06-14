import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { User } from '../app/typeorm/entities/User';
import { IShowUser } from '../contracts/IUserDTO';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepo: IUsersRepository,
  ) {}

  public async execute({ id }: IShowUser): Promise<User> {
    const foundedUser = await this.usersRepo.findById(id);

    if (!foundedUser) {
      throw new AppError('User not found!', 404);
    }

    return foundedUser;
  }
}

export { ShowUserService };
