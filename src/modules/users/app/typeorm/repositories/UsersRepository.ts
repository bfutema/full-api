import { getRepository, In, Repository } from 'typeorm';

import { ICreateUser, IListUsers } from '@modules/users/contracts/IUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private _orm: Repository<User>;

  private _relations: string[] = [];

  constructor() {
    this._orm = getRepository(User);
  }

  public async create(data: ICreateUser): Promise<User> {
    const created = this._orm.create(data);

    await this._orm.save(created);

    const founded = await this._orm.findOne(created.id, {
      relations: this._relations,
    });

    return founded;
  }

  public async update(model: User): Promise<User> {
    await this._orm.save(model);

    const founded = await this._orm.findOne(model.id, {
      relations: this._relations,
    });

    return founded;
  }

  public async findAll({
    page,
    limit,
    order,
    where,
    relations,
  }: IListUsers): Promise<[User[], number]> {
    const founds = await this._orm.findAndCount({
      relations: relations || this._relations,
      where,
      skip: page * limit,
      take: limit,
      order,
    });

    return founds;
  }

  public async findById(id: number): Promise<User> {
    const founded = await this._orm.findOne(id, {
      relations: this._relations,
    });

    return founded;
  }

  public async findByUsername(username: string): Promise<User> {
    const founded = await this._orm.findOne({
      relations: this._relations,
      where: { username },
    });

    return founded;
  }

  public async findByEmail(email: string): Promise<User> {
    const founded = await this._orm.findOne({
      relations: this._relations,
      where: { email },
    });

    return founded;
  }

  public async findByIds(ids: number[]): Promise<User[]> {
    const founds = await this._orm.find({
      where: { id: In(ids) },
      relations: this._relations,
    });

    return founds;
  }

  public async delete(id: number): Promise<void> {
    await this._orm.save({ id, enabled: false });

    await this._orm.softDelete(id);
  }
}

export { UsersRepository };
