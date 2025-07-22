import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePartnerTable1753181742143 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "partner_type_enum" AS ENUM ('supplier', 'customer')`);

    await queryRunner.createTable(
      new Table({
        name: 'partner',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          { name: 'companyId', type: 'uuid', isNullable: false },
          { name: 'name', type: 'varchar', isNullable: false },
          {
            name: 'partnerType',
            type: 'partner_type_enum',
            isNullable: false,
          },
          { name: 'createdAt', type: 'timestamptz', default: 'now()' },
          { name: 'updatedAt', type: 'timestamptz', default: 'now()' },
          { name: 'deletedAt', type: 'timestamptz', isNullable: true },
          { name: 'modifiedBy', type: 'uuid', isNullable: true },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'partner',
      new TableForeignKey({
        columnNames: ['companyId'],
        referencedTableName: 'company',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'partner',
      new TableForeignKey({
        columnNames: ['modifiedBy'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('partner');

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

    if (modifiedByFk) {
      await queryRunner.dropForeignKey('partner', modifiedByFk);
    }

    if (companyFk) {
      await queryRunner.dropForeignKey('partner', companyFk);
    }

    await queryRunner.dropTable('partner');
    await queryRunner.query(`DROP TYPE "partner_type_enum"`);
  }
}
