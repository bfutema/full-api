import { NonFunctionProperties } from '@shared/contracts/IGeneric';

import { User } from '../app/typeorm/entities/User';

/**
 * Model: User
 */
export type IUser = NonFunctionProperties<User>;

/**
 * Method: GET
 * Description: List all users with filters, orders and pagination
 */
export type IListUsers = {
  page: number;
  limit: number;
  order: object;
  where: object;
  relations?: string[];
  pagination?: boolean;
  searching?: boolean;
};

/**
 * Method: POST
 * Description: Creation of user
 */
export type ICreateUser = Omit<
  IUser,
  'id' | 'created_at' | 'updated_at' | 'deleted_at'
>;

/**
 * Method: GET
 * Description: Show one user
 */
export type IShowUser = Pick<IUser, 'id'>;

/**
 * Method: PUT
 * Description: Update one user
 */
export interface IUpdateUser extends ICreateUser {
  id: number;
}

/**
 * Method: PATCH
 * Description: Update some attributes of one user
 */
export interface IPartialUpdateUser extends Partial<IUpdateUser> {
  id: number;
}

/**
 * Method: DELETE
 * Description: Delete one user
 */
export type IDeleteUser = Pick<IUser, 'id'>;
