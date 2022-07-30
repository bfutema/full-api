import { addDays, addHours } from 'date-fns';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { authConfig } from '@config/auth';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { io } from '@shared/infra/http/app';
import { IHashProvider } from '@shared/providers/HashProvider/models/IHashProvider';

import {
  ILoginJWTTokenRequest,
  ILoginJWTTokenResponse,
} from '../contracts/IAuthenticationDTO';
import { IUsersTokensRepository } from '../repositories/IUsersTokensRepository';

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepo: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepo: IUsersTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
    client_key,
  }: ILoginJWTTokenRequest): Promise<ILoginJWTTokenResponse> {
    const foundedUser = await this.usersRepo.findByEmail(email);

    if (!foundedUser) {
      throw new AppError('Incorrect email/password combination!', 401, 'wrong');
    }

    const isLockoutExpired = foundedUser.lockout_expires
      ? foundedUser.lockout_expires < new Date()
      : false;

    const isLockout =
      foundedUser.access_failed_count === 3 && !isLockoutExpired;

    if (isLockout) {
      throw new AppError('Account lockout!', 401, 'wrong');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      foundedUser.password_hash,
    );

    if (!passwordMatched) {
      const access_failed_count =
        foundedUser.access_failed_count === 3
          ? 1
          : foundedUser.access_failed_count + 1;
      const lockout_enabled = access_failed_count === 3;
      const lockout_expires = lockout_enabled ? addHours(new Date(), 2) : null;

      if (!isLockout && access_failed_count <= 3) {
        await this.usersRepo.update({
          id: foundedUser.id,
          lockout_expires,
          lockout_enabled,
          access_failed_count,
        });
      }

      throw new AppError(
        access_failed_count === 3
          ? 'Account lockout!'
          : 'Incorrect email/password combination!',
        401,
        'wrong',
      );
    }

    const {
      secret_token,
      expires_in_secret_token,
      secret_refresh_token,
      expires_in_secret_refresh_token,
    } = authConfig.jwt;

    const token = sign(
      {
        name: foundedUser.name,
        email: foundedUser.email,
        // claims: ClaimsHelper.getClaims(
        //   user.users_roles || [],
        //   user.users_claims || [],
        // ),
      },
      secret_token,
      { subject: String(foundedUser.id), expiresIn: expires_in_secret_token },
    );

    const refresh_token = sign(
      { name: foundedUser.name, email: foundedUser.email },
      secret_refresh_token,
      {
        subject: String(foundedUser.id),
        expiresIn: expires_in_secret_refresh_token,
      },
    );

    const foundedUserToken = await this.usersTokensRepo.findByClientKey(
      client_key,
    );

    if (foundedUserToken) return { token, refresh_token };

    await this.usersTokensRepo.create({
      client_key,
      refresh_token,
      expires_date: addDays(new Date(), 30),
      user_id: foundedUser.id,
    });

    await this.usersRepo.update({
      id: foundedUser.id,
      lockout_enabled: false,
      lockout_expires: null,
      access_failed_count: 0,
    });

    io.emit('online', { user_id: foundedUser.id, status: 'online' });

    return { token, refresh_token };
  }
}

export { AuthenticateUserService };
