import { injectable, inject } from 'tsyringe';

import { ICacheProvider } from '@shared/providers/CacheProvider/models/ICacheProvider';

import { User } from '../app/typeorm/entities/User';
import { IListUsers } from '../contracts/IUserDTO';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepo: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(query: IListUsers): Promise<[User[], number]> {
    if (query.searching) {
      await this.cacheProvider.invalidate('users-list');
    }

    let foundedUsers = await this.cacheProvider.recover<[User[], number]>(
      'users-list',
    );

    if (!foundedUsers) {
      foundedUsers = await this.usersRepo.findAll(query);

      await this.cacheProvider.save('users-list', foundedUsers);
    }

    return foundedUsers;
  }
}

export { ListUsersService };
