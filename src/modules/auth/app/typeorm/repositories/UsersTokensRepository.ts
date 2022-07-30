import { getRepository, Repository } from 'typeorm';

import { ICreateUserToken } from '@modules/auth/contracts/IAuthenticationDTO';
import { IUsersTokensRepository } from '@modules/auth/repositories/IUsersTokensRepository';

import { UserHasToken } from '../entities/UserHasToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserHasToken>;

  constructor() {
    this.ormRepository = getRepository(UserHasToken);
  }

  public async create(data: ICreateUserToken): Promise<UserHasToken> {
    const userToken = this.ormRepository.create(data);

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByUserId(user_id: number): Promise<UserHasToken> {
    const userToken = this.ormRepository.findOne({ user_id });

    return userToken;
  }

  public async findByClientKey(client_key: string): Promise<UserHasToken> {
    const userToken = this.ormRepository.findOne({ client_key });

    return userToken;
  }

  public async findByUserIdAndRefreshToken(
    user_id: number,
    refresh_token: string,
  ): Promise<UserHasToken> {
    const userToken = this.ormRepository.findOne({
      user_id,
      refresh_token,
    });

    return userToken;
  }

  public async deleteByUserId(user_id: number): Promise<void> {
    await this.ormRepository.delete({ user_id });
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { UsersTokensRepository };
