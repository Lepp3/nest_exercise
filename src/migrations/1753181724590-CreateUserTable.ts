import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUserTable1753181724590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
     CREATE TYPE "user_role_enum" AS ENUM ('owner', 'operator', 'viewer')`);

    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          { name: 'companyId', type: 'uuid', isNullable: false },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'username', type: 'varchar', isNullable: false },
          { name: 'password', type: 'varchar', isNullable: false },
          {
            name: 'role',
            type: 'user_role_enum',
            isNullable: false,
            default: `'viewer'`,
          },
          { name: 'createdAt', type: 'timestamptz', default: 'now()' },
          { name: 'updatedAt', type: 'timestamptz', default: 'now()' },
          { name: 'deletedAt', type: 'timestamptz', isNullable: true },
          { name: 'modifiedBy', type: 'uuid', isNullable: true },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['companyId'],
        referencedTableName: 'company',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['modifiedBy'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user');

    const companyFk = table?.foreignKeys.find(
      (fk) =>
        fk.columnNames.includes('companyId') &&
        fk.referencedTableName === 'company',
    );

    const modifiedByFk = table?.foreignKeys.find(
      (fk) =>
        fk.columnNames.includes('modifiedBy') &&
        fk.referencedTableName === 'user',
    );

    if (modifiedByFk) await queryRunner.dropForeignKey('user', modifiedByFk);
    if (companyFk) await queryRunner.dropForeignKey('user', companyFk);

    await queryRunner.dropTable('user');
    await queryRunner.query(`DROP TYPE "user_role_enum"`);
  }
}
