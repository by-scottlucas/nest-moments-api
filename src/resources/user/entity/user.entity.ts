import { UserEnum } from "src/enums/user.enum";
import { MomentEntity } from "src/resources/moment/entity/moment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "usuario" })
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column({ default: UserEnum.Usuario })
    tipo_usuario: string;

    @OneToMany(() => MomentEntity, moment => moment)
    momentos: MomentEntity[];

}
