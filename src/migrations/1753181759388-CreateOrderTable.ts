import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrderTable1753181759388 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "order_type_enum" AS ENUM ('shipment', 'delivery')`);

    await queryRunner.createTable(
      new Table({
        name: 'order',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          { name: 'companyId', type: 'uuid', isNullable: false },
          { name: 'userId', type: 'uuid', isNullable: false },
          { name: 'warehouseId', type: 'uuid', isNullable: false },
          { name: 'partnerId', type: 'uuid', isNullable: false },
          {
            name: 'type',
            type: 'order_type_enum',
            isNullable: false,
          },
          { name: 'date', type: 'date', isNullable: false, default: 'now()' },
          { name: 'createdAt', type: 'timestamptz', default: 'now()' },
          { name: 'updatedAt', type: 'timestamptz', default: 'now()' },
          { name: 'deletedAt', type: 'timestamptz', isNullable: true },
          { name: 'modifiedBy', type: 'uuid', isNullable: true },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'order',
      new TableForeignKey({
        columnNames: ['companyId'],
        referencedTableName: 'company',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'order',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'order',
      new TableForeignKey({
        columnNames: ['warehouseId'],
        referencedTableName: 'warehouse',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'order',
      new TableForeignKey({
        columnNames: ['partnerId'],
        referencedTableName: 'partner',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'order',
      new TableForeignKey({
        columnNames: ['modifiedBy'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('order');

    const dropFk = (column: string, ref: string) =>
      table?.foreignKeys.find(
        (fk) =>
          fk.columnNames.includes(column) && fk.referencedTableName === ref,
      );

    const fks = [
      dropFk('modifiedBy', 'user'),
      dropFk('partnerId', 'partner'),
      dropFk('warehouseId', 'warehouse'),
      dropFk('userId', 'user'),
      dropFk('companyId', 'company'),
    ];

    for (const fk of fks) {
      if (fk) await queryRunner.dropForeignKey('order', fk);
    }

    await queryRunner.dropTable('order');
    await queryRunner.query(`DROP TYPE "order_type_enum"`);
  }
}
