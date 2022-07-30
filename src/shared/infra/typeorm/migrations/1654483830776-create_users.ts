import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsers1654483830776 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '80',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '80',
            isNullable: false,
          },
          {
            name: 'email_confirmed',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'password_hash',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'security_stamp',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'two_factor_enabled',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'lockout_enabled',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'lockout_expires',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'access_failed_count',
            type: 'integer',
            isNullable: false,
            default: 0,
          },
          {
            name: 'enabled',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
