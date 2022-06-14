import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { User } from '../app/typeorm/entities/User';
import { IUpdateUser } from '../contracts/IUserDTO';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepo: IUsersRepository,
  ) {}

  public async execute(data: IUpdateUser): Promise<User> {
    const foundedUser = await this.usersRepo.findById(data.id);

    if (!foundedUser) {
      throw new AppError('User not found!', 404);
    }

    const updatedUser = await this.usersRepo.update({
      ...foundedUser,
      ...data,
    });

    return updatedUser;
  }
}

export { UpdateUserService };
