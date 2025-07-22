import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateInvoiceTable1753181776576 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'invoice',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          { name: 'orderId', type: 'uuid', isNullable: false },
          { name: 'userId', type: 'uuid', isNullable: false },
          { name: 'date', type: 'date', isNullable: false, default: 'now()' },
          { name: 'invoiceNumber', type: 'varchar', isNullable: false },
          { name: 'createdAt', type: 'timestamptz', default: 'now()' },
          { name: 'updatedAt', type: 'timestamptz', default: 'now()' },
          { name: 'deletedAt', type: 'timestamptz', isNullable: true },
          { name: 'modifiedBy', type: 'uuid', isNullable: true },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'invoice',
      new TableForeignKey({
        columnNames: ['orderId'],
        referencedTableName: 'order',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'invoice',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'invoice',
      new TableForeignKey({
        columnNames: ['modifiedBy'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('invoice');

    const dropFk = (col: string, ref: string) =>
      table?.foreignKeys.find(
        (fk) => fk.columnNames.includes(col) && fk.referencedTableName === ref,
      );

    const fks = [
      dropFk('modifiedBy', 'user'),
      dropFk('userId', 'user'),
      dropFk('orderId', 'order'),
    ];

    for (const fk of fks) {
      if (fk) await queryRunner.dropForeignKey('invoice', fk);
    }

    await queryRunner.dropTable('invoice');
  }
}
