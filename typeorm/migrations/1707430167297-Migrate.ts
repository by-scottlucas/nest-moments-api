import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1707430167297 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'moments',
            columns: [{
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                unsigned: true,
            }, {
                name: 'titulo',
                type: 'varchar',
                length: '80'
            }, {
                name: 'data',
                type: 'date',
                isNullable: true
            },]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('moments');
    }

}
