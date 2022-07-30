import { newUserMail } from '@jobs/index';
import path from 'path';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { Queue } from '@shared/infra/queues/queue';
import { ICacheProvider } from '@shared/providers/CacheProvider/models/ICacheProvider';
import { IHashProvider } from '@shared/providers/HashProvider/models/IHashProvider';

import { User } from '../app/typeorm/entities/User';
import { ICreateUserRequest } from '../contracts/IUserDTO';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepo: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(data: ICreateUserRequest): Promise<User> {
    const usernameAlreadyExists = await this.usersRepo.findByUsername(
      data.username.toLowerCase().trim(),
    );

    if (usernameAlreadyExists) {
      throw new AppError('Username already exists!', 403);
    }

    const emailAlreadyExists = await this.usersRepo.findByEmail(
      data.email.toLowerCase().trim(),
    );

    if (emailAlreadyExists) {
      throw new AppError('Email already exists!', 403);
    }

    const password_hash = await this.hashProvider.generateHash(data.password);

    const createdUser = await this.usersRepo.create({
      username: data.username.toLowerCase().trim(),
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      password_hash,
    });

    await this.cacheProvider.invalidate('users-list');

    await Queue.add(newUserMail.key, {
      createdUser,
      file: path.resolve(__dirname, '..', 'views', 'welcome_new_user.hbs'),
    });

    return createdUser;
  }
}

export { CreateUserService };
