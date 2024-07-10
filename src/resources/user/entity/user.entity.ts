import { UserEnum } from "src/enums/user.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ default: UserEnum.Cliente })
    tipo_usuario: string;

}
