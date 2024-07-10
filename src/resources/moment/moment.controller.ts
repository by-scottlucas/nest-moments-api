import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ParamId } from 'src/decorators/param.id.decorator';

import { MomentDTO } from './dto/moment.dto';
import { UpdatePatchMomentDTO } from './dto/update.patch.Moment.dto';
import { MomentService } from './moment.service';

@Controller('api/v1/moments')
export class MomentController {

    constructor(private momentService: MomentService) { }

    @Post()
    @ApiCreatedResponse({ description: "Cria um novo Moment" })
    async create(@Body() data: MomentDTO) {
        return this.momentService.create(data);
    }

    @Get()
    @ApiOkResponse({ description: "Lista todos os Moments" })
    async list() {
        return this.momentService.list();
    }

    @Get(':id')
    @ApiOkResponse({ description: "Lista um Moment" })
    async readOne(@ParamId() id: number) {
        return this.momentService.read(id);
    }

    @Put(':id')
    @ApiOkResponse({ description: "Atualiza os dados de um Moment" })
    async update(@ParamId() id: number, @Body() data: MomentDTO) {
        return this.momentService.update(id, data);
    }

    @Patch(':id')
    @ApiOkResponse({ description: "Atualiza parcialmente os dados de um Moment" })
    async updatePartial(@ParamId() id: number, @Body() data: UpdatePatchMomentDTO) {
        return this.momentService.updatePartial(id, data);
    }

    @Delete(':id')
    @ApiOkResponse({ description: "Exclui um Moment" })
    async delete(@ParamId() id: number) {
        return this.momentService.delete(id);
    }

}