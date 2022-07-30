import { hash } from 'bcryptjs';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { User } from '@modules/users/app/typeorm/entities/User';

export default class PopulateUsers implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const password_hash = await hash('root', 8);

    const users = [];

    for (let index = 0; index < 10000; index++) {
      users.push({
        username: `user_${index + 1}`,
        name: `User ${index + 1}`,
        email: `user_${index + 1}@full.com.br`,
        email_confirmed: true,
        password_hash,
      });
    }

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          username: `bfutema`,
          name: `Bruno Amaral Futema`,
          email: `bfutema@full.com.br`,
          email_confirmed: true,
          password_hash,
        },
        ...users,
      ])
      .execute();
  }
}
