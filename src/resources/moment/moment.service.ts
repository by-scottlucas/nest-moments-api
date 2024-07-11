import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MomentDTO } from './dto/moment.dto';
import { UpdatePatchMomentDTO } from './dto/update.patch.Moment.dto';
import { MomentEntity } from './entity/moment.entity';

@Injectable()
export class MomentService {

    constructor(
        @InjectRepository(MomentEntity)
        private momentRepository: Repository<MomentEntity>
    ) { }

    async list() {
        return this.momentRepository.find({ relations: ['id_usuario'] });
    }

    create(data: MomentDTO) {
        return this.momentRepository.save(data);
    }

    async read(id: number) {
        return this.momentRepository.find({
            where: { id_usuario: { id } },
            relations: ['id_usuario']
        });
    }

    async update(id: number, { titulo, data }: UpdatePatchMomentDTO) {

        await this.momentRepository.exists({ where: { id } });

        const dados: any = {};

        if (titulo) {
            dados.titulo = titulo;
        }

        if (data) {
            dados.data = data;
        }

        await this.momentRepository.update(id, dados);

        return this.read(id);

    }

    async delete(id: number) {

        await this.momentRepository.exists({ where: { id } });

        await this.momentRepository.delete(id);

        return;

    }

}