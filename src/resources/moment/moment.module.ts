import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../user/entity/user.entity';
import { MomentEntity } from './entity/moment.entity';
import { MomentController } from './moment.controller';
import { MomentService } from './moment.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        MomentEntity,
        UserEntity
    ])],
    providers: [MomentService],
    exports: [MomentService],
    controllers: [MomentController]
})
export class MomentModule { }