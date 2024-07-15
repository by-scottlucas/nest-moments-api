import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/resources/user/entity/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'moment' })
export class MomentEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty({ description: "Coluna de id da entidade" })
    id: number;

    @Column()
    @ApiProperty({ description: "Coluna de titulo da entidade" })
    titulo: string;

    @Column({ type: 'date' }) // Permite que a data seja nula
    @ApiProperty({ description: "Coluna de data da entidade" })
    data: Date;

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'id_usuario'})
    id_usuario: UserEntity

    @BeforeInsert()
    setDate() {
        if (this.data) {
            this.data = new Date(this.data); // Garante que a data seja um objeto Date
        }
    }

}
