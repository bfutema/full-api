import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '@modules/users/services/CreateUserService';
import { DeleteUserService } from '@modules/users/services/DeleteUserService';
import { ListUsersService } from '@modules/users/services/ListUsersService';
import { ShowUserService } from '@modules/users/services/ShowUserService';
import { UpdateUserService } from '@modules/users/services/UpdateUserService';
import { getParsedOrders } from '@shared/functions/getParsedOrders';
import { getParsedRelations } from '@shared/functions/getParsedRelations';
import { getParsedWhere } from '@shared/functions/getParsedWhere';

type IQuery = {
  q?: string;
  page?: number;
  limit?: number;
  sort?: string;
  relations?: string;
  pagination?: string;
};

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      q = '',
      page = 1,
      limit = 50,
      sort = '',
      relations = '',
      pagination = 'true',
    } = request.query as unknown as IQuery;

    const listUsersService = container.resolve(ListUsersService);

    const [foundedUsers, totalUsers] = await listUsersService.execute({
      page: pagination ? Number(page - 1) : null,
      limit: pagination ? Number(limit) : null,
      order: getParsedOrders(sort),
      where: getParsedWhere(q),
      relations: getParsedRelations(relations),
      pagination: pagination === 'true',
      // searching: !!q,
      searching: true,
    });

    const lastPage = Math.ceil(totalUsers / Number(limit));
    const prevPage = Number(page) - 1 < 1 ? null : Number(page) - 1;
    const nextPage = Number(page) + 1 > lastPage ? null : Number(page) + 1;

    if (pagination === 'true') {
      response.setHeader('X-Total-Count', totalUsers);
      response.setHeader('X-Pagination-Page', page);
      response.setHeader('X-Pagination-Prev-Page', prevPage);
      response.setHeader('X-Pagination-Next-Page', nextPage);
      response.setHeader('X-Pagination-Last-Page', lastPage);

      return response.status(200).json({
        total: totalUsers,
        prev: prevPage,
        page: Number(page),
        next: nextPage,
        last: lastPage,
        results: instanceToInstance(foundedUsers),
      });
    }

    return response.status(200).json(instanceToInstance(foundedUsers));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { body } = request;

    const createUserService = container.resolve(CreateUserService);

    const createdUser = await createUserService.execute(body);

    return response.status(201).json(instanceToInstance(createdUser));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserService = container.resolve(ShowUserService);

    const foundedUser = await showUserService.execute({ id: Number(id) });

    return response.status(200).json(instanceToInstance(foundedUser));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { body } = request;

    const updateUserService = container.resolve(UpdateUserService);

    const updatedUser = await updateUserService.execute({ id, ...body });

    return response.status(200).json(instanceToInstance(updatedUser));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute({ id: Number(id) });

    return response.status(204).send();
  }
}

const INSTANCE = new UsersController();

export { INSTANCE as UsersController };
