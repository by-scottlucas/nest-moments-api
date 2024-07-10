import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Migrate1707430167297 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'moment',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    unsigned: true,
                },
                {
                    name: 'titulo',
                    type: 'varchar',
                    length: '80',
                },
                {
                    name: 'data',
                    type: 'date',
                    isNullable: true,
                },
                {
                    name: 'id_usuario',
                    type: 'int',
                    isNullable: false,
                },
            ],
        }));

        await queryRunner.createTable(new Table({
            name: 'usuario',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'nome',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'senha',
                    type: 'varchar',
                },
                {
                    name: 'tipo_usuario',
                    type: 'varchar',
                    default: "'Usuario'",
                },
            ],
        }));

        await queryRunner.createForeignKey('moments', new TableForeignKey({
            columnNames: ['id_usuario'],
            referencedColumnNames: ['id'],
            referencedTableName: 'usuario',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('moments', 'id_usuario');
        await queryRunner.dropTable('moments');
        await queryRunner.dropTable('usuario');
    }
}
