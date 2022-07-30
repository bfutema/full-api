import { verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { authConfig } from '@config/auth';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import {
  ITokenPayload,
  IValidateJWTTokenRequest,
  IValidateJWTTokenResponse,
} from '../contracts/IAuthenticationDTO';
import { IUsersTokensRepository } from '../repositories/IUsersTokensRepository';

@injectable()
class ValidateJWTTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepo: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepo: IUsersTokensRepository,
  ) {}

  public async execute({
    token,
  }: IValidateJWTTokenRequest): Promise<IValidateJWTTokenResponse> {
    try {
      const decoded = verify(
        token,
        authConfig.jwt.secret_token,
      ) as ITokenPayload;

      const { sub } = decoded;

      const userIsValid = await this.usersRepo.findById(Number(sub));

      const userToken = await this.usersTokensRepo.findByUserId(Number(sub));

      if (!userToken) {
        return { payload: null, isValid: false, code: 'token.logged_out' };
      }

      if (!userIsValid) {
        return { payload: null, isValid: false, code: 'user.not_valid' };
      }

      if (!userIsValid.enabled) {
        return { payload: null, isValid: false, code: 'user.inactive' };
      }

      if (userIsValid.lockout_enabled) {
        return { payload: null, isValid: false, code: 'user.lockout' };
      }

      return { payload: decoded, isValid: true, code: 'success' };
    } catch (err) {
      return { payload: null, isValid: false, code: 'token.invalid' };
    }
  }
}

export { ValidateJWTTokenService };
