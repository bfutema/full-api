import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ length: 30 })
  username: string;

  @Column({ length: 80 })
  name: string;

  @Column({ length: 80 })
  email: string;

  @Column({ default: false })
  @Exclude()
  email_confirmed?: boolean;

  @Column()
  @Exclude()
  password_hash: string;

  @Column({ default: null })
  @Exclude()
  security_stamp?: string;

  @Column({ default: false })
  @Exclude()
  two_factor_enabled?: boolean;

  @Column({ default: false })
  @Exclude()
  lockout_enabled?: boolean;

  @Column({ default: null })
  @Exclude()
  lockout_expires?: Date;

  @Column({ default: 0 })
  @Exclude()
  access_failed_count?: number;

  @Column({ default: true })
  enabled?: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  @Exclude()
  deleted_at?: Date;
}

export { User };
