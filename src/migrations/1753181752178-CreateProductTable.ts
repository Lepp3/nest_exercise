import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductTable1753181752178 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "product_support_type_enum" AS ENUM ('liquid', 'solid')`);

    await queryRunner.createTable(
      new Table({
        name: 'product',
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
            name: 'type',
            type: 'product_support_type_enum',
            isNullable: false,
          },
          { name: 'code', type: 'varchar', isNullable: false },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
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
      'product',
      new TableForeignKey({
        columnNames: ['companyId'],
        referencedTableName: 'company',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        columnNames: ['modifiedBy'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('product');

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
      await queryRunner.dropForeignKey('product', modifiedByFk);
    }

    if (companyFk) {
      await queryRunner.dropForeignKey('product', companyFk);
    }

    await queryRunner.dropTable('product');
    await queryRunner.query(`DROP TYPE "product_support_type_enum"`);
  }
}
