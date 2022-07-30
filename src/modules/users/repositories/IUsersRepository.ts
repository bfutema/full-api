import { User } from '../app/typeorm/entities/User';
import { ICreateUser, IListUsers, IUser } from '../contracts/IUserDTO';

export interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;
  update(model: Partial<IUser>): Promise<User>;
  findAll(query: IListUsers): Promise<[User[], number]>;
  findById(id: number): Promise<User | undefined>;
  findByIds(ids: number[]): Promise<User[]>;
  findByUsername(username: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  delete(id: number): Promise<void>;
}
