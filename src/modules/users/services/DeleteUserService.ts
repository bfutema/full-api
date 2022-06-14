import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IDeleteUser } from '../contracts/IUserDTO';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepo: IUsersRepository,
  ) {}

  public async execute({ id }: IDeleteUser): Promise<void> {
    const foundedUser = await this.usersRepo.findById(id);

    if (!foundedUser) {
      throw new AppError('User not found!', 404);
    }

    await this.usersRepo.delete(id);
  }
}

export { DeleteUserService };
