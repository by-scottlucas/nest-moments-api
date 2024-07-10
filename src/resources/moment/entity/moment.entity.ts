import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'moments' })
export class MomentEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty({description: "Coluna de id da entidade"})
    id: number;

    @Column()
    @ApiProperty({description: "Coluna de titulo da entidade"})
    titulo: string;

    @Column({ type: 'date' })
    @ApiProperty({description: "Coluna de data da entidade"})
    data: Date;

}