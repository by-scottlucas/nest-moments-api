import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MomentEntity } from "./entity/moment.entity";
import { Repository } from "typeorm";
import { CreateMomentDTO } from "./dto/create.moment.dto";
import { UpdatePatchMomentDTO } from "./dto/update.patch.Moment.dto";

@Injectable()
export class MomentService {

    constructor(
        @InjectRepository(MomentEntity)
        private momentRepository: Repository<MomentEntity>
    ) { }

    async create(data: CreateMomentDTO) {

        const moment = await this.momentRepository.create(data);

        return this.momentRepository.save([moment]);
    }

    async list() {
        return this.momentRepository.find();
    }

    async show(id: number) {

        await this.exists(id);

        return this.momentRepository.findOneBy({
            id
        });
    }

    async update(id: number, data: CreateMomentDTO) {

        await this.exists(id);

        await this.momentRepository.update(id, data);

        return this.show(id);

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

        return this.show(id);

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
            throw new NotFoundException(`O Moment com id ${id} não existe!`)
        }
    }

}