import { Body, Controller, Delete, Get, Patch, Post, Put } from "@nestjs/common";
import { MomentService } from "./moment.service";
import { CreateMomentDTO } from "./dto/create.moment.dto";
import { ParamId } from "src/decorators/param.id.decorator";
import { UpdatePatchMomentDTO } from "./dto/update.patch.Moment.dto";

@Controller('api/v1/moments')
export class MomentController {

    constructor(private momentService: MomentService) { }

    @Post()
    async create(@Body() data: CreateMomentDTO) {
        return this.momentService.create(data);
    }

    @Get()
    async list() {
        return this.momentService.list();
    }

    @Get(':id')
    async readOne(@ParamId() id: number) {
        return this.momentService.show(id);
    }

    @Put(':id')
    async update(@ParamId() id: number, @Body() data: CreateMomentDTO) {
        return this.momentService.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@ParamId() id: number, @Body() data: UpdatePatchMomentDTO) {
        return this.momentService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.momentService.delete(id);
    }

}