import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ParamId } from 'src/decorators/param.id.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

import { MomentDTO } from './dto/moment.dto';
import { UpdatePatchMomentDTO } from './dto/update.patch.Moment.dto';
import { MomentEntity } from './entity/moment.entity';
import { MomentService } from './moment.service';

@UseGuards(AuthGuard)
@Controller('api/v1/moments')
export class MomentController {

    constructor(
        private momentService: MomentService
    ) { }

    @Post()
    @ApiCreatedResponse({ description: "Cria um novo Moment" })
    async create(@Body() data: MomentDTO) {
        return this.momentService.create(data);
    }

    @Roles(RoleEnum.Admin)
    @UseGuards(RoleGuard)
    @Get()
    @ApiOkResponse({ description: "Lista todos os Moments. Permitido para Admnistradores" })
    async list() {
        return this.momentService.list();
    }

    @Get(':id')
    @ApiOkResponse({ description: "Lista os Moments de um Usuário" })
    async readOne(@ParamId() id: number): Promise<MomentEntity[]> {
        return this.momentService.read(id);
    }

    @Patch(':id')
    @ApiOkResponse({ description: "Atualiza parcialmente os dados de um Moment" })
    async updatePartial(@ParamId() id: number, @Body() data: UpdatePatchMomentDTO) {
        return this.momentService.update(id, data);
    }

    @Delete(':id')
    @ApiOkResponse({ description: "Exclui um Moment" })
    async delete(@ParamId() id: number) {
        return this.momentService.delete(id);
    }

}