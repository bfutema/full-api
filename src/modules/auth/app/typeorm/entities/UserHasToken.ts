import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '@modules/users/app/typeorm/entities/User';

@Entity('users_has_tokens')
class UserHasToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  client_key: string;

  @Column()
  refresh_token: string;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at?: Date;
}

export { UserHasToken };
