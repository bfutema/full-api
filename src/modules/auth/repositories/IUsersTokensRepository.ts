import { UserHasToken } from '../app/typeorm/entities/UserHasToken';
import { ICreateUserToken } from '../contracts/IAuthenticationDTO';

export interface IUsersTokensRepository {
  create(data: ICreateUserToken): Promise<UserHasToken>;
  findByUserId(user_id: number): Promise<UserHasToken | undefined>;
  findByClientKey(client_key: string): Promise<UserHasToken | undefined>;
  findByUserIdAndRefreshToken(
    user_id: number,
    refresh_token: string,
  ): Promise<UserHasToken | undefined>;
  deleteByUserId(user_id: number): Promise<void>;
  delete(id: number): Promise<void>;
}
