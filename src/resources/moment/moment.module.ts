import { Module } from "@nestjs/common";
import { MomentService } from "./moment.service";
import { MomentController } from "./moment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MomentEntity } from "./entity/moment.entity";

@Module({
    imports:[TypeOrmModule.forFeature([MomentEntity])],
    providers: [MomentService],
    exports: [MomentService],
    controllers: [MomentController]
})
export class MomentModule { }