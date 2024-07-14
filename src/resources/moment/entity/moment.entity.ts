import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/resources/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'moment' })
export class MomentEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty({ description: "Coluna de id da entidade" })
    id: number;

    @Column()
    @ApiProperty({ description: "Coluna de titulo da entidade" })
    titulo: string;

    @Column({ type: 'date' })
    @ApiProperty({ description: "Coluna de data da entidade" })
    data: Date;

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'id_usuario'})
    id_usuario: UserEntity

}