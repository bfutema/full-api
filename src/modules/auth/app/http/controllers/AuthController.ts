import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserService } from '@modules/auth/services/AuthenticateUserService';
import { LogoutUserService } from '@modules/auth/services/LogoutUserService';

class AuthController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const authData = await authenticateUserService.execute({
      email,
      password,
      client_key: request.ip,
    });

    return response.status(201).json(authData);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const logoutUserService = container.resolve(LogoutUserService);

    await logoutUserService.execute({ user_id: Number(id) });

    return response.status(204).send();
  }
}

const INSTANCE = new AuthController();

export { INSTANCE as AuthController };
