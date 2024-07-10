import { Injectable, NotFoundException } from '@nestjs/common';
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
        return this.momentRepository.find({ relations: ['usuario'] });
    }

    create(data: MomentDTO) {
        // const moment = await this.momentRepository.create(data);
        return this.momentRepository.save(data);
    }

    async read(id: number) {
        await this.exists(id);

        return this.momentRepository.findOne({
            where: { id },
            relations: ['usuario']
        });
    }

    async update(id: number, data: MomentDTO) {

        await this.exists(id);

        await this.momentRepository.update(id, data);

        return this.read(id);

    }

    async updatePartial(id: number, { titulo, data }: UpdatePatchMomentDTO) {

        await this.exists(id);

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

        await this.exists(id);

        await this.momentRepository.delete(id);

        return;

    }

    private async exists(id: number) {

        const idCount = await this.momentRepository.exists({
            where: {
                id
            }
        });

        if (!idCount) {
            throw new NotFoundException(`Moment não encontrado`)
        }
    }

}