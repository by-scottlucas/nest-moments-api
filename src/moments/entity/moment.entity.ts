import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'moments' })
export class MomentEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column({ type: 'date' })
    data: Date;

}